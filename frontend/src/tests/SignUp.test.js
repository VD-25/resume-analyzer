import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignUp from '../components/auth/SignUp';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Set up mock adapter for axios
const mockAxios = new MockAdapter(axios);

describe('SignUp Component', () => {
  afterEach(() => {
    mockAxios.reset(); // Reset the mock between tests
  });

  test('renders SignUp form correctly', () => {
    render(<SignUp />);

    // Check for the heading and form fields with better specificity
    expect(screen.getByRole('heading', { name: /Sign Up/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

    // Check for the button by role and name
    expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument();
  });

  test('handles username input correctly', () => {
    render(<SignUp />);
    const usernameInput = screen.getByLabelText(/Username/i);

    fireEvent.change(usernameInput, { target: { value: 'newuser' } });
    expect(usernameInput.value).toBe('newuser');
  });

  test('handles email input correctly', () => {
    render(<SignUp />);
    const emailInput = screen.getByLabelText(/Email/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');
  });

  test('handles password input correctly', () => {
    render(<SignUp />);
    const passwordInput = screen.getByLabelText(/Password/i);

    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(passwordInput.value).toBe('password123');
  });

  test('shows error message on failed form submission (email already registered)', async () => {
    const errorMessage = 'Email is already in use';
    mockAxios.onPost('http://localhost:3000/api/register').reply(400, { message: errorMessage });

    render(<SignUp />);

    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'newuser' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

    await waitFor(() => expect(screen.getByText(errorMessage)).toBeInTheDocument());
    expect(screen.queryByText(/Something went wrong/i)).toBeNull();
  });

  test('shows success message on successful form submission', async () => {
    const successMessage = 'User registered successfully!';
    mockAxios.onPost('http://localhost:3000/api/register').reply(200, { message: successMessage });

    render(<SignUp />);

    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'newuser' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

    await waitFor(() => expect(screen.getByText(successMessage)).toBeInTheDocument());
    expect(screen.queryByText(/Something went wrong/i)).toBeNull();
  });

  test('disables submit button while submitting', async () => {
    mockAxios.onPost('http://localhost:3000/api/register').reply(200, { message: 'User registered successfully!' });

    render(<SignUp />);

    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'newuser' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });

    const submitButton = screen.getByRole('button', { name: /Sign Up/i });

    fireEvent.click(submitButton);

    // Check if the submit button is disabled during the API call
    expect(submitButton).toBeDisabled();

    await waitFor(() => expect(screen.getByText('User registered successfully!')).toBeInTheDocument());

    // Check if the submit button is enabled after the API response
    expect(submitButton).toBeEnabled();
  });
});