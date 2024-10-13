import React from 'react';
import { render } from '@testing-library/react-native';
import HealthAdviceComponent from '../src/components/HealthAdviceComponent';

test('renders the health advice', () => {
  const advice = 'Ensure you take your prescribed medication on time.';

  const { getByText } = render(<HealthAdviceComponent advice={advice} />);

  expect(getByText('Health Advice')).toBeTruthy();
  expect(getByText(advice)).toBeTruthy();
});
