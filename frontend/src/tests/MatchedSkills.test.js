import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import MatchedSkills from '../components/resume/MatchedSkills'; // Adjust path if necessary
import { calculateFitScore } from '../api/fitscore'; // The API function to be mocked

jest.mock('../api/fitscore', () => ({
  calculateFitScore: jest.fn(),
}));

describe('MatchedSkills Component', () => {

  it('displays a loading message when loading is true', () => {
    render(<MatchedSkills loading={true} />);
    expect(screen.getByText(/Loading Matched Skills.../i)).toBeInTheDocument();
  });

  it('displays matched skills when loading is false and skills are returned', async () => {
    calculateFitScore.mockResolvedValueOnce({ matched: ['skill'] });

    render(<MatchedSkills loading={true} />);

    const skillJavaScript = await screen.findByText(/skill/i);
    expect(skillJavaScript).toBeInTheDocument();
  });

  it('displays nothing when no matched skills are returned', async () => {
    calculateFitScore.mockResolvedValueOnce({ matched: [] });

    render(<MatchedSkills loading={false} />);

    await waitFor(() => {
      const listItems = screen.queryAllByRole('listitem');
      expect(listItems).toHaveLength(0); // No list items should be rendered
    });
  });

  it('displays an error message when an error occurs', async () => {
    calculateFitScore.mockRejectedValue(new Error('New Error'));

    render(<MatchedSkills loading={true} />);
    await waitFor(() => {
      expect(calculateFitScore).toHaveBeenCalledTimes(1);
    });

    // Wait for the error message to be rendered
    const errorMessage = await screen.findByText(/Loading Matched Skills.../i);
    expect(errorMessage).toBeInTheDocument();
  });
});
