import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
  // Common container style
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  // Header text style
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  // Text style for regular paragraphs
  text: {
    fontSize: 16,
    color: '#333',
  },
  // Input field style
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 15,
  },
  // Button style
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Style for task/reminder lists
  listItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});

export default globalStyles;
