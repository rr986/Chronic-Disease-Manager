
// Bad Smell 1: Code Duplication

// Bad Smell 2: Unnecessary Console Logs
// Not directly testable, but tests pass regardless of console.log presence.
// tests/AddDiaryEntry.test.jsx

import { render, screen, fireEvent } from '@testing-library/react';
import AddDiaryEntry from '../src/AddDiaryEntry';

describe('AddDiaryEntry Component', () => {
  const mockAddDiaryEntry = jest.fn();

  test('renders textarea and submit button', () => {
    render(<AddDiaryEntry addDiaryEntry={mockAddDiaryEntry} />);
    expect(screen.getByPlaceholderText(/Describe your feelings or experiences\.\.\./i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add entry/i })).toBeInTheDocument();
  });

  test('submits the form with valid input', () => {
    render(<AddDiaryEntry addDiaryEntry={mockAddDiaryEntry} />);

    fireEvent.change(
      screen.getByPlaceholderText(/Describe your feelings or experiences\.\.\./i),
      { target: { value: 'Today was a wonderful day!' } }
    );

    fireEvent.click(screen.getByRole('button', { name: /add entry/i }));

    expect(mockAddDiaryEntry).toHaveBeenCalledWith('Today was a wonderful day!');
  });
});
