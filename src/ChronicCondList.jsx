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
  const checkupDate = new Date(formattedDate);

  // Generate speech text
  const speechText = `You have ${Condition}. Your last checkup was on ${checkupDate.toLocaleDateString()}.`;

  return (
    <div className="chronic-condition-item">
      <h2>{Condition}</h2>
      <p>Last Checkup Date: {Checkup}</p>
      <button onClick={() => deleteReminder(id)} className="btn delete-btn">
        Delete
      </button>
      {/* Optional Toggle Completed Button */}
      {toggleCompleted && (
        <button onClick={() => toggleCompleted(id)} className="btn toggle-btn">
          {completed ? 'Mark as Incomplete' : 'Mark as Complete'}
        </button>
      )}
      <Speech
        text={speechText}
        textAsButton={true}
        displayText="Read"
        className="btn read-btn"
      />
    </div>
  );
};

export default ChronCondList;
