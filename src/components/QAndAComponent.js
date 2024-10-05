import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import globalStyles from '../styles';  // Import the global styles

const QAndAComponent = ({ question }) => {
  const [answer, setAnswer] = useState('');

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.header}>{question}</Text>
      <TextInput
        style={globalStyles.input}
        value={answer}
        onChangeText={setAnswer}
        placeholder="Type your answer here"
      />
    </View>
  );
};

export default QAndAComponent;
