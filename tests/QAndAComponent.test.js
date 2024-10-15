import React from 'react';
import { render } from '@testing-library/react-native';
import QAndAComponent from '../src/components/QAndAComponent';

test('renders the question and input field', () => {
    const question = 'What is your health condition?';
  
    const { getByText, getByPlaceholderText } = render(<QAndAComponent question={question} />);
  
    expect(getByText(question)).toBeTruthy();
    expect(getByPlaceholderText('Type your answer here')).toBeTruthy();
  });