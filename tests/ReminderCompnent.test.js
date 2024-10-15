import React from 'react';
import { render } from '@testing-library/react-native';
import QAndAComponent from '../src/components/ReminderComponent';

test('renders the reminder text', () => {
    const reminder = 'Take your medication at 8:00 AM.';

    const { getByText } = render(<ReminderComponent reminder={reminder} />);
  
    expect(getByText('Reminder')).toBeTruthy();
    expect(getByText(reminder)).toBeTruthy();
  });