import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AnalysisPage from '../components/AnalysisPage'; // Adjust the import path as necessary

// Mock the fetch API call
global.fetch = jest.fn();

describe('AnalysisPage Component', () => {
  
  beforeEach(() => {
    // Reset the mock before each test to clear previous calls
    fetch.mockClear();
  });

  it('displays loading state initially', () => {
    render(<AnalysisPage />);
    // Check if the "Loading..." message is displayed
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('displays an error message when there is an error in fetching data', async () => {
    // Mock fetch to simulate a failed API call
    fetch.mockRejectedValueOnce(new Error('Network response was not ok'));
    
    render(<AnalysisPage />);
    
    // Wait for the error message to be rendered
    await waitFor(() => {
      expect(screen.getByText(/Error: Network response was not ok/i)).toBeInTheDocument();
    });
  });

  it('displays the data when API call is successful', async () => {
    // Mock a successful fetch response
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        id: '123',
        name: 'John Doe',
        age: 30,
        email: 'john.doe@example.com',
        location: 'New York',
      }),
    });

    render(<AnalysisPage />);

    // Wait for the component to finish fetching and rendering the data
    await waitFor(() => {
      expect(screen.getByText(/Formatting tips:/i)).toBeInTheDocument();
      expect(screen.getByText(/Experience:/i)).toBeInTheDocument();
      expect(screen.getByText(/Skills:/i)).toBeInTheDocument();
      expect(screen.getByText(/Job Description Matching:/i)).toBeInTheDocument();
      expect(screen.getByText(/Language\/Grammar tips:/i)).toBeInTheDocument();

      // Check if the actual data is displayed
      expect(screen.getByText('123')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('30')).toBeInTheDocument();
      expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
      expect(screen.getByText('New York')).toBeInTheDocument();
    });
  });

  it('displays the data container if data is null or empty', async () => {
    // Mock a successful fetch response with empty/null data
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(null),
    });

    render(<AnalysisPage />);

    // Wait for the component to finish rendering
    await waitFor(() => {
      expect(screen.queryByText('Formatting tips:')).toBeNull();
      expect(screen.queryByText('Experience:')).toBeNull();
      expect(screen.queryByText('Skills:')).toBeNull();
      expect(screen.queryByText('Job Description Matching:')).toBeNull();
      expect(screen.queryByText('Language/Grammar tips:')).toBeNull();
    });
  });
});
