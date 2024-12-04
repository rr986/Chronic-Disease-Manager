import React from 'react';
import Speech from 'react-speech';

const RemindList = ({
  id,
  title,
  description,
  due,
  time,
  completed,
  handleClick,
  deleteReminder,
}) => {
  const parseFormattedDueDate = (formattedDueDate) => {
    if (formattedDueDate.includes('/')) {
      // Assume MM/DD/YYYY
      const [month, day, year] = formattedDueDate.split('/');
      return new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
    }
    if (formattedDueDate.includes('-')) {
      // Assume YYYY-MM-DD
      return new Date(formattedDueDate);
    }
    return null; // Invalid format
  };
  let formattedDueDate = 'No due date';
  if (due) {
    if (typeof due === 'string') {
      formattedDueDate = due;
    } else if (due.seconds) {
      // Due date is a Firestore Timestamp
      const dueDate = due.toDate(); 
      formattedDueDate = dueDate.toLocaleDateString();
    } else {
      formattedDueDate = 'Invalid date';
    }
  }
  const dueDateObj = parseFormattedDueDate(formattedDueDate);
  const fullDueDateObj =
    dueDateObj && time  ? new Date(`${dueDateObj.toISOString().split('T')[0]}T${time}:00`): null;
  const today = new Date();
  const isExpired = fullDueDateObj ? fullDueDateObj < today : false;
  let timeAm = (ti) => {
    let [hours, minutes] = ti.split(":").map(str => parseInt(str, 10));
    if(hours > 12){
      hours = hours-12;
      let newTime = `${hours}:${minutes.toString().padStart(2, '0')} PM`;
      return newTime
    }
    else if(hours === 12){
      let newTime = `${hours}:${minutes.toString().padStart(2, '0')} PM`;
      return newTime
    }
    else if(hours === 0){
      let newTime = `12:${minutes.toString().padStart(2, '0')} AM`;
      return newTime
    }
    else{
      return `${ti} AM`;
    }
  }
  const speechText = `This reminder is titled ${title}. ${description}. It is due on ${
    formattedDueDate !== 'Invalid date' ? formattedDueDate : 'an unspecified date'
  } at ${timeAm(time)}`;
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
    <div className={`reminder-item ${isExpired ? 'expired' : ''}`}>
      <h3>{title}</h3>
      <p>{description}</p>
      <p>Due Date: {formattedDueDate}</p>
      <p>Time: {timeAm(time)}</p>
      {isExpired && <p className="expired-message">This reminder is past due!</p>}
      <p>Completed: {completed ? 'Yes' : 'No'}</p>
      <button onClick={() => deleteReminder(id)}>Delete</button>
      <button onClick={() => handleClick({ id, title, description, due, completed })}>
        {completed ? 'Undo' : 'Complete'}
      </button>
      <button onClick={() => handleRead(speechText)}> Read </button>
    </div>
  );
};

export default RemindList;
