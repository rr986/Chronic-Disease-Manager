import React from 'react';
import Speech from 'react-speech';

function RemindList({ id, title, description, due, completed, handleClick, deleteReminder }) { // Changed deleteTodo to deleteReminder
    const today = new Date();

    const dueDate = due ? new Date(due) : null;
    const isExpired = dueDate ? dueDate < today : false;

    const speechText = `This reminder is titled ${title}. ${description}. It is due on ${due || "an unspecified date"}.`;

    return (
        <div className={isExpired ? "expired" : ""}>
            <h1>{title}</h1>
            <p>{description}</p>
            <p>Due Date: {due || "No due date provided"}</p>
            {isExpired && <p className="expired-message">This reminder is past due!</p>}
            <p>Completed: {completed ? "Yes" : "No"}</p>
            <button onClick={() => deleteReminder(id)} className="btn delete-btn">Delete</button> {/* Updated prop name */}
            <button onClick={() => handleClick({ id, title, description, due, completed })} className="btn complete-btn">
                {completed ? "Undo" : "Complete"}
            </button>
            <Speech text={speechText} textAsButton={true} displayText="Read" />
        </div>
    );
}

export default RemindList;