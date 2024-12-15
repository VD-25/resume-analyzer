import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ResumeUpload from '../components/resume/ResumeUpload'; // Adjust path as necessary
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mockAxios = new MockAdapter(axios);

describe('ResumeUpload Component', () => {
  afterEach(() => {
    mockAxios.reset(); // Reset the mock between tests
  });

  test('File and Text Input successful', () => {
    render(<ResumeUpload onUploadSuccess={jest.fn()} />);

    // Check if the file input and text input are rendered
    expect(screen.getByLabelText(/Choose a PDF/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Text \(Max 5000 characters\):/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Upload/i })).toBeInTheDocument();
  });

  test('Error if input file is not PDF', () => {
    render(<ResumeUpload onUploadSuccess={jest.fn()} />);

    // Simulate file input with a non-PDF file
    const fileInput = screen.getByLabelText(/Choose a PDF/i);
    fireEvent.change(fileInput, {
      target: { files: [new File(['dummy content'], 'test.txt', { type: 'text/plain' })] },
    });

    expect(screen.getByText(/Please upload a valid PDF file./i)).toBeInTheDocument();
  });

  test('Error if file larger than 2MB', async () => {
    render(<ResumeUpload onUploadSuccess={jest.fn()} />);

    // Simulate selecting a large file (3MB)
    const fileInput = screen.getByLabelText(/Choose a PDF/i);
    const largeFile = new File(['a'.repeat(3 * 1024 * 1024)], 'large.pdf', { type: 'application/pdf' });
    fireEvent.change(fileInput, { target: { files: [largeFile] } });

    await waitFor(() => {
      expect(screen.getByText(/File must be smaller than 2MB./i)).toBeInTheDocument();
    });
  });

  test('5000-character limit on text input', () => {
    render(<ResumeUpload onUploadSuccess={jest.fn()} />);

    const textInput = screen.getByLabelText(/Text \(Max 5000 characters\):/i);

    // Simulate typing text longer than 5000 characters
    fireEvent.change(textInput, { target: { value: 'a'.repeat(6000) } });

    expect(screen.getByText(/Text exceeds the 5000-character limit./i)).toBeInTheDocument();
  });

  test('disables the submit button while submitting', async () => {
    // Mock both endpoints to return success
    mockAxios.onPost('http://localhost:3000/api/resume-upload').reply(200, { message: 'Resume uploaded successfully' });
    mockAxios.onPost('http://localhost:3000/api/job-description').reply(200, { message: 'Job description uploaded successfully' });

    render(<ResumeUpload onUploadSuccess={jest.fn()} />);
    
    const fileInput = screen.getByLabelText(/Choose a PDF/i);
    fireEvent.change(fileInput, {
      target: { files: [new File(['dummy content'], 'valid.pdf', { type: 'application/pdf' })] },
    });
    
    const textInput = screen.getByLabelText(/Text \(Max 5000 characters\):/i);
    fireEvent.change(textInput, { target: { value: 'Valid text input' } });
    
    const submitButton = screen.getByRole('button', { name: /Upload/i });

    // Submit the form and check if the submit button is disabled
    fireEvent.click(submitButton);
    expect(submitButton).toBeDisabled();

    // Wait for both success messages and check if the button is enabled again
    await waitFor(() => {
      expect(screen.getByText(/Text uploaded successfully:/)).toBeInTheDocument();
      expect(screen.getByText(/Text uploaded successfully:/)).toBeInTheDocument();
      expect(submitButton).toBeEnabled();
    });
  });

  test('shows error message on failed upload', async () => {
    mockAxios.onPost('http://localhost:3000/api/resume-upload').reply(500, { message: 'Internal Server Error' });
    render(<ResumeUpload onUploadSuccess={jest.fn()} />);

    const fileInput = screen.getByLabelText(/Choose a PDF/i);
    fireEvent.change(fileInput, {
      target: { files: [new File(['dummy content'], 'valid.pdf', { type: 'application/pdf' })] },
    });

    const textInput = screen.getByLabelText(/Text \(Max 5000 characters\):/i);
    fireEvent.change(textInput, { target: { value: 'Valid text input' } });

    const submitButton = screen.getByRole('button', { name: /Upload/i });
    fireEvent.click(submitButton);

    // Check that the error message is displayed
    await waitFor(() => expect(screen.getByText(/There was an error uploading your text. Please try again./)).toBeInTheDocument());
  });

  test('Success message on Successful Upload', async () => {
    // Mock API response
    mockAxios.onPost('http://localhost:3000/api/resume-upload').reply(200, { message: 'Success' });
    
    // Create a mock function for onUploadSuccess
    const onUploadSuccess = jest.fn();
    
    // Render the component
    render(<ResumeUpload onUploadSuccess={onUploadSuccess} />);
    
    // Find the file input and simulate a file change
    const fileInput = screen.getByLabelText(/Choose a PDF/i);
    fireEvent.change(fileInput, {
      target: { files: [new File(['dummy content'], 'valid.pdf', { type: 'application/pdf' })] },
    });
  
    // Find the text input and simulate typing text
    const textInput = screen.getByLabelText(/Text \(Max 5000 characters\):/i);
    fireEvent.change(textInput, { target: { value: 'Valid text input' } });
  
    // Find and click the submit button
    const submitButton = screen.getByRole('button', { name: /Upload/i });
    fireEvent.click(submitButton);
  
    // Wait for the success message to appear
    await waitFor(() => expect(screen.getByText(/File uploaded successfully:/)).toBeInTheDocument());
  
    // Ensure that the onUploadSuccess callback was called
    expect(onUploadSuccess).toHaveBeenCalledTimes(1);
  });
});