import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ResumeUpload from '../components/resume/ResumeUpload'; // Adjust path as necessary
import axios from 'axios';
import "jest-canvas-mock";
import MockAdapter from 'axios-mock-adapter';

const mockAxios = new MockAdapter(axios);

describe('ResumeUpload Component', () => {
  afterEach(() => {
    mockAxios.reset(); // Reset the mock between tests
  });

  test('File and Text Input successful', () => {
    render(<ResumeUpload onUploadSuccess={jest.fn()} />);

    // Check if the file input and text input are rendered
    expect(screen.getByLabelText(/Choose a Resume File/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Upload a File/i })).toBeInTheDocument();
  });

  test('Error if input file is not PDF', () => {
    render(<ResumeUpload onUploadSuccess={jest.fn()} />);

    // Simulate file input with a non-PDF file
    const fileInput = screen.getByLabelText(/Choose a Resume File/i);
    fireEvent.change(fileInput, {
      target: { files: [new File(['dummy content'], 'test.txt', { type: 'text/plain' })] },
    });

    expect(screen.getByText(/Please upload a valid PDF or DOCX file./i)).toBeInTheDocument();
  });

  test('Error if file larger than 2MB', async () => {
    render(<ResumeUpload onUploadSuccess={jest.fn()} />);

    // Simulate selecting a large file (3MB)
    const fileInput = screen.getByLabelText(/Choose a Resume File/i);
    const largeFile = new File(['a'.repeat(3 * 1024 * 1024)], 'large.pdf', { type: 'application/pdf' });
    fireEvent.change(fileInput, { target: { files: [largeFile] } });

    await waitFor(() => {
      expect(screen.getByText(/File must be smaller than 2MB./i)).toBeInTheDocument();
    });
  });

  test('10000-character limit on text input', () => {
    render(<ResumeUpload onUploadSuccess={jest.fn()} />);

    const textInput = screen.getByLabelText(/Job Description/i);

    fireEvent.change(textInput, { target: { value: 'a'.repeat(10001) } });

    expect(screen.getByText(/10000 characters/i)).toBeInTheDocument();
  });

  test('shows error message on failed upload', async () => {
    mockAxios.onPost('http://localhost:3000/api/resume-upload').reply(500, { message: 'Internal Server Error' });
    render(<ResumeUpload onUploadSuccess={jest.fn()} />);

    const fileInput = screen.getByLabelText(/Choose a Resume File/i);
    fireEvent.change(fileInput, {
      target: { files: [new File(['dummy content'], 'valid.pdf', { type: 'application/pdf' })] },
    });

    const textInput = screen.getByLabelText(/Job Description/i);
    fireEvent.change(textInput, { target: { value: 'Valid text input' } });

    const submitButton = screen.getByRole('button', { name: /Upload/i });
    fireEvent.click(submitButton);

    await waitFor(() => expect(screen.getByText(/User is not authenticated. Please log in./)).toBeInTheDocument());
  });
});