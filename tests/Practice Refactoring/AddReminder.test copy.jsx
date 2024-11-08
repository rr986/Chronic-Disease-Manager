import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddReminder from '../src/AddReminder';

describe('AddReminder Component', () => {
  const mockAddFunc = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('submits the form with valid input', async () => {
    render(<AddReminder add_func={mockAddFunc} />);

    await userEvent.type(
      screen.getByPlaceholderText(/title/i),
      'Buy Groceries'
    );
    await userEvent.type(
      screen.getByPlaceholderText(/description/i),
      'Buy milk, eggs, and bread.'
    );
    await userEvent.type(
      screen.getByPlaceholderText(/due date/i),
      '2024-12-10'
    );

    await userEvent.click(
      screen.getByRole('button', { name: /submit/i })
    );

    await waitFor(() => {
      expect(mockAddFunc).toHaveBeenCalledWith(
        'Buy Groceries',
        'Buy milk, eggs, and bread.',
        '2024-12-10'
      );
    });
    expect(
      screen.getByText(/reminder added successfully!/i)
    ).toBeInTheDocument();
  });

  test('displays error message on submission failure', async () => {
    mockAddFunc.mockRejectedValueOnce(
      new Error('Failed to add reminder.')
    );
    render(<AddReminder add_func={mockAddFunc} />);

    await userEvent.type(
      screen.getByPlaceholderText(/title/i),
      'Doctor Appointment'
    );
    await userEvent.type(
      screen.getByPlaceholderText(/description/i),
      'Annual checkup.'
    );
    await userEvent.type(
      screen.getByPlaceholderText(/due date/i),
      '2024-12-10'
    );

    await userEvent.click(
      screen.getByRole('button', { name: /submit/i })
    );

    await waitFor(() => {
      expect(
        screen.getByText(/failed to add reminder\./i)
      ).toBeInTheDocument();
    });
  });
});
