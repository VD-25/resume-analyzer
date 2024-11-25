import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ResumeUpload from '../components/ResumeUpload'; // Adjust path as necessary
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mockAxios = new MockAdapter(axios);

describe('ResumeUpload Component', () => {
  afterEach(() => {
    mockAxios.reset(); // Reset the mock between tests
  });

  test('renders file input and text input correctly', () => {
    render(<ResumeUpload onUploadSuccess={jest.fn()} />);

    // Check if the file input and text input are rendered
    expect(screen.getByLabelText(/Upload PDF File:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Text \(Max 5000 characters\):/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Upload/i })).toBeInTheDocument();
  });

  test('shows error if file is not a PDF', () => {
    render(<ResumeUpload onUploadSuccess={jest.fn()} />);

    // Simulate file input with a non-PDF file
    const fileInput = screen.getByLabelText(/Upload PDF File:/i);
    fireEvent.change(fileInput, {
      target: { files: [new File(['dummy content'], 'test.txt', { type: 'text/plain' })] },
    });

    expect(screen.getByText(/Please upload a valid PDF file./i)).toBeInTheDocument();
  });

  test('shows error if file is larger than 2MB', async () => {
    render(<ResumeUpload onUploadSuccess={jest.fn()} />);
  
    // Simulate selecting a large file (3MB)
    const fileInput = screen.getByLabelText(/Upload PDF File:/i);
    const largeFile = new File(['a'.repeat(3 * 1024 * 1024)], 'large.pdf', { type: 'application/pdf' });
    fireEvent.change(fileInput, { target: { files: [largeFile] } });
  
    await waitFor(() => {
      expect(screen.getByText(/File must be smaller than 2MB./i)).toBeInTheDocument();
    });
  });
  
  test('enforces 5000-character limit on text input', () => {
    render(<ResumeUpload onUploadSuccess={jest.fn()} />);

    const textInput = screen.getByLabelText(/Text \(Max 5000 characters\):/i);

    // Simulate typing text longer than 5000 characters
    fireEvent.change(textInput, { target: { value: 'a'.repeat(6000) } });

    expect(screen.getByText(/Text exceeds the 5000-character limit./i)).toBeInTheDocument();
  });

  test('disables the submit button while submitting', async () => {
    mockAxios.onPost('http://localhost:3000/api/upload').reply(200, { message: 'Success' });
    render(<ResumeUpload onUploadSuccess={jest.fn()} />);

    const fileInput = screen.getByLabelText(/Upload PDF File:/i);
    fireEvent.change(fileInput, {
      target: { files: [new File(['dummy content'], 'valid.pdf', { type: 'application/pdf' })] },
    });

    const textInput = screen.getByLabelText(/Text \(Max 5000 characters\):/i);
    fireEvent.change(textInput, { target: { value: 'Valid text input' } });

    const submitButton = screen.getByRole('button', { name: /Upload/i });

    // Submit the form and check if the submit button is disabled
    fireEvent.click(submitButton);
    expect(submitButton).toBeDisabled();

    // Wait for the success message and check if the button is enabled again
    await waitFor(() => expect(screen.getByText(/File and text uploaded successfully/)).toBeInTheDocument());
    expect(submitButton).toBeEnabled();
  });

  test('shows error message on failed upload', async () => {
    mockAxios.onPost('http://localhost:3000/api/upload').reply(500, { message: 'Internal Server Error' });
    render(<ResumeUpload onUploadSuccess={jest.fn()} />);

    const fileInput = screen.getByLabelText(/Upload PDF File:/i);
    fireEvent.change(fileInput, {
      target: { files: [new File(['dummy content'], 'valid.pdf', { type: 'application/pdf' })] },
    });

    const textInput = screen.getByLabelText(/Text \(Max 5000 characters\):/i);
    fireEvent.change(textInput, { target: { value: 'Valid text input' } });

    const submitButton = screen.getByRole('button', { name: /Upload/i });
    fireEvent.click(submitButton);

    // Check that the error message is displayed
    await waitFor(() => expect(screen.getByText(/There was an error uploading your file and text. Please try again./)).toBeInTheDocument());
  });

  test('shows success message on successful upload', async () => {
    mockAxios.onPost('http://localhost:3000/api/upload').reply(200, { message: 'Success' });
    render(<ResumeUpload onUploadSuccess={jest.fn()} />);

    const fileInput = screen.getByLabelText(/Upload PDF File:/i);
    fireEvent.change(fileInput, {
      target: { files: [new File(['dummy content'], 'valid.pdf', { type: 'application/pdf' })] },
    });

    const textInput = screen.getByLabelText(/Text \(Max 5000 characters\):/i);
    fireEvent.change(textInput, { target: { value: 'Valid text input' } });

    const submitButton = screen.getByRole('button', { name: /Upload/i });
    fireEvent.click(submitButton);

    // Check that the success message is displayed
    await waitFor(() => expect(screen.getByText(/File and text uploaded successfully/)).toBeInTheDocument());
  });
});