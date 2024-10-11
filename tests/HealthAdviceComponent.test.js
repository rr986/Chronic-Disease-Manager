import React from 'react';
import { render } from '@testing-library/react-native';  // Import testing library
import HealthAdviceComponent from '../HealthAdviceComponent';  // Import the component
import globalStyles from '../styles';  // Import global styles

// Template
// Test block for HealthAdviceComponent
describe('HealthAdviceComponent', () => {
  it('renders the health advice correctly', () => {
    const adviceText = 'Remember to take your medications regularly';  // Mock advice text

    // Render the component with the mock advice text
    const { getByText } = render(<HealthAdviceComponent advice={adviceText} />);

    // Check if the component renders the health advice correctly
    expect(getByText('Health Advice')).toBeTruthy();
    expect(getByText(adviceText)).toBeTruthy();
  });

  it('applies the global styles correctly', () => {
    const adviceText = 'Drink water frequently';

    // Render the component
    const { getByText } = render(<HealthAdviceComponent advice={adviceText} />);

    // Check if the correct styles are applied
    const header = getByText('Health Advice');
    const advice = getByText(adviceText);

    // Assuming `globalStyles.header` and `globalStyles.text` have fontSize defined
    expect(header.props.style).toContainEqual(globalStyles.header);
    expect(advice.props.style).toContainEqual(globalStyles.text);
  });
});
