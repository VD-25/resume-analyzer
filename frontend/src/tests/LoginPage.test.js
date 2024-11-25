import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import  axios  from 'axios';
import LoginPage from '../components/LoginPage';

jest.mock('axios'); // Mock the axios library

describe('LoginPage Component', () => {

  // Test: Rendering the form
  it('renders the login form with email, password fields and submit button', () => {
    render(<LoginPage onLoginSuccess={jest.fn()} />);

    expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });

  // Test: Validation - Missing email or password
  it('shows an error if email or password is missing', () => {
    render(<LoginPage onLoginSuccess={jest.fn()} />);

    const submitButton = screen.getByRole('button', { name: /Login/i });

    // Simulate form submission with empty fields
    fireEvent.click(submitButton);

    expect(screen.getByText(/Please enter both email and password./i)).toBeInTheDocument();
  });

  // Test: Success - Successful login
  it('submits the form and calls onLoginSuccess on success', async () => {
    // Mock successful axios response
    axios.post.mockResolvedValue({ data: { message: 'Login successful' } });

    const mockOnLoginSuccess = jest.fn();
    render(<LoginPage onLoginSuccess={mockOnLoginSuccess} />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password:/i), { target: { value: 'password123' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    // Wait for the login success to happen
    await waitFor(() => expect(mockOnLoginSuccess).toHaveBeenCalledWith(true));

    // Check if the form reset state
    expect(screen.getByLabelText(/Email:/i).value).toBe('');
    expect(screen.getByLabelText(/Password:/i).value).toBe('');
  });

  // Test: Error - Failed login
  it('displays an error message on login failure', async () => {
    // Mock failed axios response
    axios.post.mockRejectedValue({ response: { data: 'Invalid email or password.' } });

    render(<LoginPage onLoginSuccess={jest.fn()} />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: 'wrong@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password:/i), { target: { value: 'wrongpassword' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    // Wait for the error message to appear
    await waitFor(() => expect(screen.getByText(/Invalid email or password./i)).toBeInTheDocument());
  });

  // Test: Loading state - Button text changes to 'Logging in...'
  it('shows the loading state when the form is submitting', async () => {
    // Mock successful axios response after a delay
    axios.post.mockResolvedValue({ data: { message: 'Login successful' } });

    render(<LoginPage onLoginSuccess={jest.fn()} />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password:/i), { target: { value: 'password123' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    // Ensure the button text changes to 'Logging in...'
    expect(screen.getByRole('button', { name: /Logging in.../i })).toBeInTheDocument();
  });
});