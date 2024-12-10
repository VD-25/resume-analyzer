import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import Dashboard from '../components/Dashboard';

jest.mock('axios');

const mockData = {
  fit_score: 85,
  feedback: [
    "Include experience with AWS services.",
    "Add projects demonstrating REST API development."
  ],
  matched_keywords: ["Python", "REST APIs", "AWS"]
};

test('renders dashboard with data', async () => {
  axios.post.mockResolvedValue({ data: mockData });

  render(<Dashboard />);

  await waitFor(() => expect(screen.getByText('Fit Score')).toBeInTheDocument());

  expect(screen.getByText('85%')).toBeInTheDocument();
  expect(screen.getByText('Python')).toBeInTheDocument();
  expect(screen.getByText('Include experience with AWS services.')).toBeInTheDocument();
});
