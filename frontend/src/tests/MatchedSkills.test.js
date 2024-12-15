import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MatchedSkills from '../components/resume/MatchedSkills'; // Adjust path if necessary
import { calculateFitScore } from '../api/fitscore'; // The API function to be mocked

// Mock the calculateFitScore API function
jest.mock('../api/fitscore', () => ({
  calculateFitScore: jest.fn(),
}));

describe('MatchedSkills Component', () => {
  
  // Test case for the loading state
  it('displays a loading message when loading is true', () => {
    render(<MatchedSkills loading={true} />);
    expect(screen.getByText(/Loading Matched Skills.../i)).toBeInTheDocument();
  });

  // Test case for successful fetching of matched skills
  it('displays matched skills when loading is false and skills are returned', async () => {
    // Mock the API response to return matched skills
    calculateFitScore.mockResolvedValueOnce({ matched: ['JavaScript', 'React', 'Node.js'] });

    render(<MatchedSkills loading={false} />);

    // Wait for the skills to appear
    const skillJavaScript = await screen.findByText(/JavaScript/i);
    const skillReact = await screen.findByText(/React/i);
    const skillNodeJS = await screen.findByText(/Node.js/i);

    // Assertions to check that skills are rendered correctly
    expect(skillJavaScript).toBeInTheDocument();
    expect(skillReact).toBeInTheDocument();
    expect(skillNodeJS).toBeInTheDocument();
  });

  // Test case for when no skills are returned (empty list)
  it('displays nothing when no matched skills are returned', async () => {
    // Mock the API response to return no matched skills
    calculateFitScore.mockResolvedValueOnce({ matched: [] });

    render(<MatchedSkills loading={false} />);

    // Wait for the skills to be rendered
    await waitFor(() => {
      const listItems = screen.queryAllByRole('listitem');
      expect(listItems).toHaveLength(0); // No list items should be rendered
    });
  });

  // Test case for when the API call fails
  it('displays an error message when an error occurs', async () => {
    // Mock the API to throw an error
    calculateFitScore.mockRejectedValueOnce(new Error('Failed to fetch matched skills'));

    render(<MatchedSkills loading={false} />);

    // Wait for the error message to be rendered
    const errorMessage = await screen.findByText(/Failed to fetch matched skills/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
