import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import Dashboard from '../components/dashboard/Dashboard';

jest.mock('axios');

const mockData = {
  fit_score: 85,
  feedback: [
    "Include experience with AWS services.",
    "Add projects demonstrating REST API development."
  ],
  matched: ["Python", "REST APIs", "AWS"]
};

test("renders dashboard with data", async () => {
  axios.post.mockResolvedValue({ data: mockData });

  render(<Dashboard />);

  await waitFor(() => expect(screen.getByText('Fit Score Analysis')).toBeInTheDocument());
});
