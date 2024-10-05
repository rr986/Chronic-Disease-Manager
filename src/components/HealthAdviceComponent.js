import React from 'react';
import { View, Text } from 'react-native';
import globalStyles from '../styles';  // Import the global styles

const HealthAdviceComponent = ({ advice }) => {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.header}>Health Advice</Text>
      <Text style={globalStyles.text}>{advice}</Text>
    </View>
  );
};

export default HealthAdviceComponent;
