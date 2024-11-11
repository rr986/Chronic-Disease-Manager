import React from 'react';
import Speech from 'react-speech';

const RemindList = ({
  id,
  title,
  description,
  due,
  completed,
  handleClick,
  deleteReminder,
}) => {
  // Handle due date formatting
  let formattedDueDate = 'No due date';

  if (due) {
    if (typeof due === 'string') {
      // Due date is already a formatted string
      formattedDueDate = due;
    } else if (due.seconds) {
      // Due date is a Firestore Timestamp
      const dueDate = due.toDate(); // Convert to JavaScript Date
      formattedDueDate = dueDate.toLocaleDateString();
    } else {
      // Handle other cases if necessary
      formattedDueDate = 'Invalid date';
    }
  }

  // Determine if the reminder is expired
  const today = new Date();
  const dueDateObj = new Date(formattedDueDate);
  const isExpired = dueDateObj < today;

  // Construct the speech text
  const speechText = `This reminder is titled ${title}. ${description}. It is due on ${
    formattedDueDate !== 'Invalid date' ? formattedDueDate : 'an unspecified date'
  }.`;

  return (
    <div className={`reminder-item ${isExpired ? 'expired' : ''}`}>
      <h3>{title}</h3>
      <p>{description}</p>
      <p>Due Date: {formattedDueDate}</p>
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
