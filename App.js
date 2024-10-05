import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import TaskManager from './TaskManager';  // Import the TaskManager screen

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TaskManager />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
});

export default App;
