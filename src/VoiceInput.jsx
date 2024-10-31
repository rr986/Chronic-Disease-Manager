import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import db from './firebase/reminderModel.js'; // Import Firestore instance
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const VoiceInput = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  // Function to add the voice input as a reminder in Firestore
  const addVoiceReminder = async (transcript) => {
    try {
      if (!transcript) {
        throw new Error('Transcript is empty. Please say something.');
      }
      setLoading(true);
      await addDoc(collection(db, 'reminders'), {
        title: 'Voice Reminder',
        description: transcript,
        due: new Date().toISOString().split('T')[0] // Set today's date as due date
      });
      setResponse('Reminder added successfully!');
    } catch (error) {
      console.error('Error adding voice reminder:', error);
      setResponse('Error adding reminder');
    } finally {
      setLoading(false);
    }
  };

  const handleSend = () => {
    SpeechRecognition.stopListening();
    addVoiceReminder(transcript);
  };

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={handleSend}>Send to Helper</button>
      <button onClick={resetTranscript}>Reset</button>

      <p>Voice Input: {transcript}</p>
      {loading ? <p>Loading response...</p> : <p>Response: {response}</p>}
    </div>
  );
};

export default VoiceInput;

