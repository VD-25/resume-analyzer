import { render, screen, waitFor } from '@testing-library/react';
import FitScoreComponent from '../components/resume/FitScore';
import { calculateFitScore } from '../api/fitscore';

// Mock the calculateFitScore function
jest.mock('../api/fitscore', () => ({
  calculateFitScore: jest.fn(),
}));

describe('FitScoreComponent', () => {
  test('shows loading message when loading is true', () => {
    render(<FitScoreComponent loading={true} />);
    const loadingMessage = screen.getByText(/Loading Fit Score.../i);
    expect(loadingMessage).toBeInTheDocument();
  });

  test('shows fit score when loading is false and fitScore is available', async () => {
    // Mocking the API call to return a fit score
    calculateFitScore.mockResolvedValue({ fit_score: 85 });

    render(<FitScoreComponent loading={false} />); // No fitScore prop needed here

    // Ensure the mock API was called
    expect(calculateFitScore).toHaveBeenCalledTimes(1);

    // Wait for the fit score to appear
    await waitFor(() => {
      const fitScoreText = screen.getByText(/Fit Score: 85%/i);
      expect(fitScoreText).toBeInTheDocument();
    });

    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '85');
  });

  test('shows error message when there is an error calculating the fit score', async () => {
    // Mocking the API call to throw an error
    calculateFitScore.mockRejectedValue(new Error('API error'));

    render(<FitScoreComponent loading={false} />); // No fitScore prop needed here

    // Ensure the mock API was called
    expect(calculateFitScore).toHaveBeenCalledTimes(1);

    // Wait for the error message to appear
    await waitFor(() => {
      const errorMessage = screen.getByText(/An error occurred while calculating the fit score/i);
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test('does not show fit score when loading is false and fitScore is null', () => {
    render(<FitScoreComponent loading={false} />);
    const noFitScoreMessage = screen.queryByText(/Fit Score:/i);
    expect(noFitScoreMessage).not.toBeInTheDocument();
  });
});
