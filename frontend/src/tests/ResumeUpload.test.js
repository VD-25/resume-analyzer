import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ResumeUpload from '../components/ResumeUpload';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Set up a mock adapter for axios
const mockAxios = new MockAdapter(axios);

describe('ResumeUpload Component', () => {
  afterEach(() => {
    mockAxios.reset(); // Reset the mock between tests
  });

  test('renders without crashing', () => {
    render(<ResumeUpload onUploadSuccess={jest.fn()} />);
    expect(screen.getByText(/Upload PDF and Text/i)).toBeInTheDocument();
  });

  test('handles PDF file input correctly', () => {
    const { getByLabelText } = render(<ResumeUpload onUploadSuccess={jest.fn()} />);
    const fileInput = getByLabelText(/pdfFile/i);

    const validFile = new File([new Blob(['test'])], 'resume.pdf', { type: 'application/pdf' });
    const invalidFile = new File([new Blob(['test'])], 'resume.txt', { type: 'text/plain' });

    // Test valid PDF file
    fireEvent.change(fileInput, { target: { files: [validFile] } });
    expect(screen.queryByText(/File must be smaller than 2MB/i)).toBeNull();

    // Test invalid file type
    fireEvent.change(fileInput, { target: { files: [invalidFile] } });
    expect(screen.getByText(/Please upload a valid PDF file/i)).toBeInTheDocument();
  });

  test('handles text input validation (5000 character limit)', () => {
    const { getByLabelText } = render(<ResumeUpload onUploadSuccess={jest.fn()} />);
    const textArea = getByLabelText(/Text \(Max 5000 characters\)/i);

    // Input text under limit
    fireEvent.change(textArea, { target: { value: 'Hello, world!' } });
    expect(screen.queryByText(/Text exceeds the 5000-character limit/i)).toBeNull();

    // Input text over the limit
    fireEvent.change(textArea, { target: { value: 'a'.repeat(5001) } });
    expect(screen.getByText(/Text exceeds the 5000-character limit/i)).toBeInTheDocument();
  });

  test('displays error if no file is selected', async () => {
    const { getByText, getByRole } = render(<ResumeUpload onUploadSuccess={jest.fn()} />);
    const submitButton = getByRole('button', { name: /upload/i });

    // Try to submit with no file
    fireEvent.click(submitButton);
    await waitFor(() => expect(screen.getByText(/Please upload a PDF file/i)).toBeInTheDocument());
  });

  test('displays error if text input is empty', async () => {
    const { getByLabelText, getByRole, getByText } = render(<ResumeUpload onUploadSuccess={jest.fn()} />);
    const submitButton = getByRole('button', { name: /upload/i });
    const fileInput = getByLabelText(/pdfFile/i);

    // Simulate selecting a file
    const file = new File([new Blob(['test'])], 'resume.pdf', { type: 'application/pdf' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Try to submit with empty text input
    fireEvent.click(submitButton);
    await waitFor(() => expect(getByText(/Text input cannot be empty/i)).toBeInTheDocument());
  });

  test('submits form with file and text successfully', async () => {
    const onUploadSuccessMock = jest.fn();
    const { getByLabelText, getByRole, getByText } = render(
      <ResumeUpload onUploadSuccess={onUploadSuccessMock} />
    );

    const submitButton = getByRole('button', { name: /upload/i });
    const fileInput = getByLabelText(/pdfFile/i);
    const textArea = getByLabelText(/Text \(Max 5000 characters\)/i);

    const file = new File([new Blob(['test'])], 'resume.pdf', { type: 'application/pdf' });

    // Simulate selecting a file
    fireEvent.change(fileInput, { target: { files: [file] } });
    
    // Simulate entering text
    fireEvent.change(textArea, { target: { value: 'Some text input' } });

    // Mock successful API response
    mockAxios.onPost('http://localhost:3000/api/upload').reply(200, { message: 'Upload successful' });

    // Submit form
    fireEvent.click(submitButton);

    // Check loading state
    expect(submitButton).toBeDisabled();

    await waitFor(() => {
      expect(screen.getByText(/Upload successful/i)).toBeInTheDocument();
      expect(onUploadSuccessMock).toHaveBeenCalledWith(true);
    });

    // Check that form inputs are cleared
    expect(fileInput.files.length).toBe(0);
    expect(textArea.value).toBe('');
  });

  test('handles error when upload fails', async () => {
    const { getByLabelText, getByRole, getByText } = render(<ResumeUpload onUploadSuccess={jest.fn()} />);
    const submitButton = getByRole('button', { name: /upload/i });
    const fileInput = getByLabelText(/pdfFile/i);
    const textArea = getByLabelText(/Text \(Max 5000 characters\)/i);

    const file = new File([new Blob(['test'])], 'resume.pdf', { type: 'application/pdf' });

    // Simulate selecting a file
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Simulate entering text
    fireEvent.change(textArea, { target: { value: 'Some text input' } });

    // Mock failed API response
    mockAxios.onPost('http://localhost:3000/api/upload').reply(500);

    // Submit form
    fireEvent.click(submitButton);

    // Check loading state
    expect(submitButton).toBeDisabled();

    await waitFor(() => {
      expect(screen.getByText(/There was an error uploading your file and text/i)).toBeInTheDocument();
    });
  });
});
