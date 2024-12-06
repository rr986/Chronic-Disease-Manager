import React, { useState, useContext } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import db from './firebase/reminderModel.js';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Speech from 'react-speech';
import { AuthContext } from './context/AuthContext';
import { GoogleGenerativeAI } from "@google/generative-ai";

const VoiceInput = () => {
  const { currentUser } = useContext(AuthContext);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const [response, setResponse] = useState('');
  const [aiResponse, setAIResponse] = useState('');
  const [error, setError] = useState('');
  const [loadingReminder, setLoadingReminder] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);

  if (!browserSupportsSpeechRecognition) {
    return <span>Your browser doesn't support speech recognition.</span>;
  }

const getCurrentTimeAndAddOneHour = () => { const now = new Date();
const hours = now.getHours();
const minutes = now.getMinutes();
// Format the current time in 'hh:mm'
const currentTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
// Add 1 hour
now.setHours(now.getHours() + 1);
// Get the updated hours and minutes
const updatedHours = now.getHours(); const updatedMinutes = now.getMinutes();
// Format the updated time in 'hh:mm'
const updatedTime = `${String(updatedHours).padStart(2, '0')}:${String(updatedMinutes).padStart(2, '0')}`;
return { currentTime, updatedTime };
};
  // Function to add the voice input as a reminder in Firestore
  const addVoiceReminder = async (transcriptText) => {
    if (!currentUser) {
      setError('User not authenticated.');
      return;
    }

    try {
      // Reset previous errors and responses
      setError('');
      setResponse('');
      setAIResponse('');

      const trimmedTranscript = transcriptText.trim();

      // Enhanced Validation
      if (!trimmedTranscript) {
        throw new Error('Transcript is empty. Please say something.');
      }
      if (trimmedTranscript.length < 5) {
        throw new Error('Transcript is too short. Please provide more details.');
      }

      setLoadingReminder(true);

      const { currentTime, updatedTime } = getCurrentTimeAndAddOneHour();

      // Prepare the new reminder object
      const newReminder = {
        title: 'Voice Reminder',
        description: trimmedTranscript,
        due: new Date().toISOString().split('T')[0], // Set today's date as due date
        time:updatedTime,
        createdAt: Timestamp.now(),
        completed: false,
      };
      // Reference to the user's reminders subcollection
      const userRemindersRef = collection(db, 'users', currentUser.uid, 'reminders');

      // Add the new reminder to Firestore
      await addDoc(userRemindersRef, newReminder);

      setResponse('✅ Reminder added successfully!');
      resetTranscript(); // Clear the transcript after successful addition
    } catch (err) {
      console.error('Error adding voice reminder:', err);
      setError(`❌ ${err.message || 'Error adding reminder.'}`);
    } finally {
      setLoadingReminder(false);
    }
  };

  // Function to get AI response from Google's Generative AI
  const generateAIResponse = async (query) => {
    try {
      // Reset previous errors and responses
      setError('');
      setResponse('');
      setAIResponse('');

      const trimmedQuery = query.trim();

      // Enhanced Validation
      if (!trimmedQuery) {
        throw new Error('Transcript is empty. Please ask a question.');
      }
      if (trimmedQuery.length < 5) {
        throw new Error('Transcript is too short. Please provide a more detailed question.');
      }

      setLoadingAI(true);

      // Initialize Google Generative AI (Replace with your actual API integration)
      const genAI = new GoogleGenerativeAI('AIzaSyB2k5WLsyyVAiHgTMNV2l6gGnImTwFTskI');

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const data = await model.generateContent(trimmedQuery);
      setAIResponse(`🤖 AI Response: ${data.response.candidates[0].content.parts[0].text}`);
      resetTranscript(); // Clear the transcript after receiving the response
    } catch (err) {
      console.error('Error fetching AI response:', err);
      setError(`❌ ${err.message || 'Error fetching AI response.'}`);
    } finally {
      setLoadingAI(false);
    }
  };

  const handleStartListening = () => {
    setResponse('');
    setAIResponse('');
    setError('');
    SpeechRecognition.startListening({ continuous: false, language: 'en-US' });
  };

  const handleAddReminder = () => {
    SpeechRecognition.stopListening();
    addVoiceReminder(transcript);
  };

  const handleSendToAI = () => {
    SpeechRecognition.stopListening();
    generateAIResponse(transcript);
  };

  const handleReset = () => {
    resetTranscript();
    setResponse('');
    setAIResponse('');
    setError('');
  };

  return (
    <div className="voice-input-container">
      <h2>Voice Input</h2>

      <div className="status-indicators">
        <p>
          Microphone: <span className={listening ? 'status on' : 'status off'}>
            {listening ? 'On 🔊' : 'Off 🔇'}
          </span>
        </p>
      </div>

      <div className="controls">
        <button
          onClick={handleStartListening}
          disabled={listening || loadingReminder || loadingAI}
          className={`btn start-btn ${listening ? 'active' : ''}`}
          aria-label="Start Listening"
        >
          {listening ? 'Listening...' : 'Start'}
        </button>
        <button
          onClick={handleAddReminder}
          disabled={!transcript || loadingReminder || loadingAI}
          className="btn send-reminder-btn"
          aria-label="Send to Reminder"
        >
          {loadingReminder ? 'Adding...' : 'Add Reminder'}
        </button>
        <button
          onClick={handleSendToAI}
          disabled={!transcript || loadingAI || loadingReminder}
          className="btn send-ai-btn"
          aria-label="Send to AI"
        >
          {loadingAI ? 'Sending...' : 'Send to AI'}
        </button>
        <button
          onClick={handleReset}
          disabled={loadingReminder || loadingAI}
          className="btn reset-btn"
          aria-label="Reset Transcript"
        >
          Reset
        </button>
      </div>

      <div className="transcript-display">
        <h3>Voice Input:</h3>
        <p className="transcript">{transcript || 'No input yet.'}</p>
      </div>

      <div className="feedback">
        {(loadingReminder || loadingAI) && <p className="loading">🔄 Processing...</p>}
        {response && <p className="success">{response}</p>}
        {aiResponse && <p className="ai-response">{aiResponse}</p>}
        {error && <p className="error">{error}</p>}
      </div>

      {/* Optional: Read AI Response Aloud */}
      {aiResponse && (
        <Speech
          text={aiResponse}
          textAsButton={false} // Set to false to auto-read
          displayText=""
        />
      )}
    </div>
  );
};

export default VoiceInput;
