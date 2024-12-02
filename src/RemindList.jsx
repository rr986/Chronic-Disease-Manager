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
  
  // Parse MM/DD/YYYY to Date object
  const parseFormattedDueDate = (formattedDueDate) => {
    const [month, day, year] = formattedDueDate.split('/');
    return new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
  };

  const dueDateObj = parseFormattedDueDate(due);
  const fullDueDateObj = new Date(`${dueDateObj.toISOString().split('T')[0]}T${time}:00`); // Combine due date and time for comparison
  const today = new Date(); 
  const isExpired = fullDueDateObj < today;
  
  const speechText = `This reminder is titled ${title}. ${description}. It is due on ${
    formattedDueDate !== 'Invalid date' ? formattedDueDate : 'an unspecified date'
  }.`;

  return (
    <div className={`reminder-item ${isExpired ? 'expired' : ''}`}>
      <h3>{title}</h3>
      <p>{description}</p>
      <p>Due Date: {formattedDueDate}</p>
      <p>Time: {time}</p>
      {isExpired && <p className="expired-message">This reminder is past due!</p>}
      <p>Completed: {completed ? 'Yes' : 'No'}</p>
      <button onClick={() => deleteReminder(id)}>Delete</button>
      <button onClick={() => handleClick({ id, title, description, due, completed })}>
        {completed ? 'Undo' : 'Complete'}
      </button>
      <Speech text={speechText} textAsButton={true} displayText="Read" />
    </div>
  );
};

export default RemindList;
