import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { collection, getDocs } from 'firebase/firestore';
import db from './firebase/reminderModel';
import { GoogleGenerativeAI } from '@google/generative-ai';

const ConditionAdvice = () => {
  const { currentUser } = useContext(AuthContext);
  const [conditions, setConditions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [aiResponses, setAIResponses] = useState({}); // Track AI responses

  const fetchConditionAdvice = async (condition) => {
    try {
      setLoadingAI(true);
      const trimmedQuery = `Give me one to two bullets of health advice for ${condition}`;
      const genAI = new GoogleGenerativeAI('AIzaSyB2k5WLsyyVAiHgTMNV2l6gGnImTwFTskI');
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const data = await model.generateContent(trimmedQuery);
      console.log('AI Response:', data)
      setAIResponses(prevState => ({
        ...prevState,
        [condition]: data.response.candidates[0].content.parts[0].text,
      }));
    } catch (err) {
      console.error('Error fetching response:', err);
      setError('Error fetching AI response.');
    } finally {
      setLoadingAI(false);
    }
  };

  useEffect(() => {
    const fetchConditions = async () => {
      setLoading(true);
      setError(null);

      try {
        if (!currentUser) {
          throw new Error('User is not authenticated.');
        }

        const conditionsCollectionRef = collection(db, 'users', currentUser.uid, 'chronic_conditions');
        const snapshot = await getDocs(conditionsCollectionRef);

        // Fetch conditions without AI advice initially
        const fetchedConditions = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          advice: 'Advice is being generated...', // Placeholder
        }));

        setConditions(fetchedConditions);

        // After loading conditions, fetch advice for each one
        snapshot.docs.forEach(doc => {
          const condition = doc.data().Condition;
          if (!aiResponses[condition]) {
            fetchConditionAdvice(condition);
          }
        });
      } catch (err) {
        console.error('Error fetching conditions:', err);
        setError('Failed to load chronic conditions.');
      } finally {
        setLoading(false);
      }
    };

    fetchConditions();
  }, [currentUser, aiResponses]); // Trigger effect whenever aiResponses changes
  
  const handleRead = (text) => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();

      // const utterance = new SpeechSynthesisUtterance(text);
      // speechSynthesis.speak(utterance);
      const sentences = text.split('. ').filter((sentence) => sentence.trim());
      sentences.forEach((sentence) => {
        const utterance = new SpeechSynthesisUtterance(sentence + '.');
        speechSynthesis.speak(utterance);
    });
    } else {
      alert('Your browser does not support text-to-speech.');
    }
  };

  const handlePause = () => {
    if ('speechSynthesis' in window) {
      if (speechSynthesis.speaking && !speechSynthesis.paused) {
        speechSynthesis.pause();
      }
    } else {
      alert('Your browser does not support text-to-speech.');
    }
  };

  if (loading) return <p>Loading conditions for advice...</p>;
  if (error) return <p className="error">{error}</p>;
  /*
  return (
    <div>
      <h1>Condition Advice</h1>
      {conditions.length > 0 ? (
        conditions.map((condition) => (
          <div key={condition.id}>
            <h2>{condition.Condition}</h2>
            <p>Checkup Date: {condition.Checkup}</p>
            <p><strong>Advice:</strong> {aiResponses[condition.Condition] || 'Advice is being generated...'}</p>
          </div>
        ))
      ) : (
        <p>No chronic conditions found. Please add conditions to get advice.</p>
      )}
    </div>
  );
  */
  return (
    <div>
      <h1>Condition Advice</h1>
      {conditions.length > 0 ? (
        conditions.map((condition) => (
          <div key={condition.id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h2>{condition.Condition}</h2>
            <p><strong>Checkup Date:</strong> {new Date(condition.Checkup).toLocaleDateString()}</p>
            <div>
              <strong>Advice:</strong>
              <div style={{ marginLeft: '20px', lineHeight: '1.6' }}>
                {aiResponses[condition.Condition]
                  ? (() => {
                      const adviceList = aiResponses[condition.Condition]
                        .split('*')
                        .filter(item => item.trim());
                      const mergedAdvice = [];
                      for (let i = 0; i < adviceList.length; i += 2) {
                        const title = adviceList[i]?.trim().replace(/\s*:\s*$/, ':');
                        const content = adviceList[i + 1]?.trim();
                        if (title && content) {
                          mergedAdvice.push(`${title} ${content}`);
                        }
                      }
                      return (
                        <>
                          {mergedAdvice.map((item, index) => (
                            <p key={index} style={{ marginBottom: '10px' }}>
                              {`${index + 1}. ${item}`}
                            </p>
                          ))}
                          <button
                            onClick={() => handleRead(mergedAdvice.join(' '))}
                          >
                            Read
                          </button>
                          <button
                            onClick={handlePause}
                          >
                            Pause
                          </button>
                        </>
                      );
                    })()
                  : 'Advice is being generated...'}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No chronic conditions found. Please add conditions to get advice.</p>
      )}
    </div>
  );
};

export default ConditionAdvice;
