import React from 'react';
import Speech from 'react-speech';

const ChronCondList = ({ id, Condition, Checkup, completed, deleteReminder, toggleCompleted }) => {
  /*
  if (completed) {
    return null;
  }
  */
  // Covert the Checkup date from "MM/DD/YYYY" to "YYYY-MM-DD"
  const [month, day, year] = Checkup.split('/');
  const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  const checkupDate = new Date(formattedDate + "T00:00:00");

  // Generate speech text
  const speechText = `You have ${Condition}. Your last checkup was on ${checkupDate.toLocaleDateString()}.`;
  const handleRead = (text) => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
      
    } else {
      alert('Your browser does not support text-to-speech.');
    }
  };
  return (
    <div className="chronic-condition-item">
      <h2>{Condition}</h2>
      <p>Last Checkup Date: {Checkup}</p>
      <button onClick={() => deleteReminder(id)} className="btn delete-btn">
        Delete
      </button>
      <button onClick={() => handleRead(speechText)} className = "btn read-btn"> Read </button>
    </div>
  );
};

export default ChronCondList;
