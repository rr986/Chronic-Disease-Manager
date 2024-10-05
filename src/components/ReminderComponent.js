import React from 'react';
import { View, Text } from 'react-native';
import globalStyles from '../styles';  // Import the global styles

const ReminderComponent = ({ reminder }) => {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.header}>Reminder</Text>
      <Text style={globalStyles.text}>{reminder}</Text>
    </View>
  );
};

export default ReminderComponent;
