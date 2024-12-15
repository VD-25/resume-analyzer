import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ImprovementSuggestions from './ImprovementSuggestions';

describe('ImprovementSuggestions Component', () => {
  
  // Test case for the loading state
  it('displays a loading message when loading is true', () => {
    render(<ImprovementSuggestions feedback={null} loading={true} />);
    expect(screen.getByText(/Loading Improvement Suggestions.../i)).toBeInTheDocument();
  });

  // Test case for showing suggestions when feedback is provided
  it('displays suggestions when feedback is provided', () => {
    const feedback = {
      suggestions: ['Improve the UI', 'Fix the bugs', 'Enhance performance']
    };
    render(<ImprovementSuggestions feedback={feedback} loading={false} />);
    
    expect(screen.getByText(/Improve the UI/i)).toBeInTheDocument();
    expect(screen.getByText(/Fix the bugs/i)).toBeInTheDocument();
    expect(screen.getByText(/Enhance performance/i)).toBeInTheDocument();
  });

  // Test case for empty suggestions array
  it('displays nothing if feedback.suggestions is empty', () => {
    const feedback = { suggestions: [] };
    render(<ImprovementSuggestions feedback={feedback} loading={false} />);
    
    // Ensure there are no suggestion items in the list
    const listItems = screen.queryAllByRole('listitem');
    expect(listItems).toHaveLength(0);
  });

  // Test case for handling an empty feedback object
  it('does not display any suggestions if feedback is null or undefined', () => {
    render(<ImprovementSuggestions feedback={null} loading={false} />);
    
    const listItems = screen.queryAllByRole('listitem');
    expect(listItems).toHaveLength(0);
  });

  // Test case for displaying an error message
  it('displays an error message when an error occurs', () => {
    render(<ImprovementSuggestions feedback={null} loading={false} error="An error occurred" />);
    expect(screen.getByText(/An error occurred/i)).toBeInTheDocument();
  });
});
