import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Speech from 'react-speech';
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

  
  const generateResponse = async (query) => {
    try {
      const genAI = new GoogleGenerativeAI('AIzaSyB2k5WLsyyVAiHgTMNV2l6gGnImTwFTskI');
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
      setLoading(true);
      
      const data = await model.generateContent(query);
      setResponse(data.response.text);  
    } catch (error) {
      console.error('Error fetching response:', error);
      setResponse('Error fetching response');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button
        onClick={() => {
          SpeechRecognition.stopListening();
          generateResponse(transcript); 
        }}
      >
        Send to Helper
      </button>
      <button onClick={resetTranscript}>Reset</button>
      
      <p>Voice Input: {transcript}</p>
      {loading ? <p>Loading response...</p> : <p> Response: {response}</p>}
      <Speech text = {response}
                textAsButton={true}    
                displayText="Read"/>
    </div>
  );
};

export default VoiceInput;
