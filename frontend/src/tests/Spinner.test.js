import React from 'react';
import { render } from '@testing-library/react';
import Spinner from '../components/Spinner'; // Make sure the path to Spinner.js is correct
import '@testing-library/jest-dom/extend-expect'; // for the "toBeInTheDocument" matcher

describe('Spinner component', () => {
  it('renders the spinner element', () => {
    // Render the Spinner component
    const { container } = render(<Spinner />);
    
    // Check if the spinner div is in the document
    const spinner = container.querySelector('.spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('has the correct class name', () => {
    // Render the Spinner component
    const { container } = render(<Spinner />);
    
    // Check if the spinner div has the correct class
    const spinner = container.querySelector('.spinner');
    expect(spinner).toHaveClass('spinner');
  });
});
