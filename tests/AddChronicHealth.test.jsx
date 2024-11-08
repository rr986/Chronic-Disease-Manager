import { render, screen, fireEvent } from '@testing-library/react';
import AddChronicHealth from '../src/AddChronicHealth';

describe('AddChronicHealth Component', () => {
  const mockAddFunc = jest.fn();

  test('renders the form inputs and submit button', () => {
    render(<AddChronicHealth add_func={mockAddFunc} />);
    expect(screen.getByLabelText(/Condition:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Checkup Date:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test('submits the form with valid input', () => {
    render(<AddChronicHealth add_func={mockAddFunc} />);

    fireEvent.change(screen.getByPlaceholderText('Condition'), { target: { value: 'Hypertension' } });
    fireEvent.change(screen.getByPlaceholderText('Checkup'), { target: { value: '2023-11-07' } }); // Use today's date or a past date

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(mockAddFunc).toHaveBeenCalledWith('Hypertension', '2023-11-07');
  });
});
