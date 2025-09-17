import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputField from './InputField';

jest.mock('@heroicons/react/24/outline', () => ({}));

describe('InputField', () => {
  const user = userEvent.setup();

  test('renders input field with label and helper text', () => {
    render(
      <InputField
        label="Email Address"
        helperText="We'll never share your email"
        placeholder="Enter your email"
      />
    );

    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByText("We'll never share your email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
  });

  test('shows required asterisk when required prop is true', () => {
    render(<InputField label="Username" required />);
    
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  test('displays error message when invalid', () => {
    render(
      <InputField
        label="Email"
        invalid={true}
        errorMessage="Invalid email format"
      />
    );

    expect(screen.getByText('Invalid email format')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  test('handles value changes', async () => {
    const handleChange = jest.fn();
    
    render(
      <InputField
        label="Name"
        value=""
        onChange={handleChange}
      />
    );

    const input = screen.getByRole('textbox');
    await user.type(input, 'John Doe');

    expect(handleChange).toHaveBeenCalledTimes(8); // Once for each character
  });

  test('shows clear button when showClear is true and input has value', () => {
    render(
      <InputField
        label="Search"
        value="test value"
        showClear={true}
        onChange={() => {}}
      />
    );

    expect(screen.getByLabelText('Clear input')).toBeInTheDocument();
  });

  test('clears input when clear button is clicked', async () => {
    const handleChange = jest.fn();
    
    render(
      <InputField
        label="Search"
        value="test value"
        showClear={true}
        onChange={handleChange}
      />
    );

    const clearButton = screen.getByLabelText('Clear input');
    await user.click(clearButton);

    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: '' })
      })
    );
  });

  test('shows password toggle button for password type', () => {
    render(
      <InputField
        type="password"
        showPasswordToggle={true}
        value="password"
        onChange={() => {}}
      />
    );

    expect(screen.getByLabelText('Show password')).toBeInTheDocument();
  });

  test('toggles password visibility when toggle button is clicked', async () => {
    render(
      <InputField
        type="password"
        showPasswordToggle={true}
        value="secret"
        onChange={() => {}}
      />
    );

    const input = screen.getByDisplayValue('secret');
    const toggleButton = screen.getByLabelText('Show password');

    expect(input).toHaveAttribute('type', 'password');

    await user.click(toggleButton);

    expect(input).toHaveAttribute('type', 'text');
    expect(screen.getByLabelText('Hide password')).toBeInTheDocument();
  });

  test('applies disabled styles when disabled', () => {
    render(
      <InputField
        label="Disabled Input"
        disabled={true}
        value="Cannot edit"
        onChange={() => {}}
      />
    );

    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
    expect(input).toHaveClass('cursor-not-allowed');
  });

  test('handles focus and blur events', async () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();

    render(
      <InputField
        label="Test Input"
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    );

    const input = screen.getByRole('textbox');

    await user.click(input);
    expect(handleFocus).toHaveBeenCalled();

    await user.tab();
    expect(handleBlur).toHaveBeenCalled();
  });

  test('applies correct size classes', () => {
    const { rerender } = render(<InputField size="sm" />);
    let input = screen.getByRole('textbox');
    expect(input).toHaveClass('text-sm');

    rerender(<InputField size="lg" />);
    input = screen.getByRole('textbox');
    expect(input).toHaveClass('text-lg');
  });

  test('applies correct variant classes', () => {
    const { rerender } = render(<InputField variant="filled" />);
    let input = screen.getByRole('textbox');
    expect(input).toHaveClass('bg-gray-50');

    rerender(<InputField variant="ghost" />);
    input = screen.getByRole('textbox');
    expect(input).toHaveClass('bg-transparent');
  });

  test('associates helper text with input using aria-describedby', () => {
    render(
      <InputField
        label="Email"
        helperText="Enter a valid email"
      />
    );

    const input = screen.getByRole('textbox');
    const helperText = screen.getByText('Enter a valid email');
    
    expect(input).toHaveAttribute('aria-describedby', helperText.id);
  });

  test('does not show clear button when disabled', () => {
    render(
      <InputField
        value="test"
        showClear={true}
        disabled={true}
        onChange={() => {}}
      />
    );

    expect(screen.queryByLabelText('Clear input')).not.toBeInTheDocument();
  });
});
