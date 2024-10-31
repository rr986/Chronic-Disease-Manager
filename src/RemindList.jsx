import React from 'react';
import Speech from 'react-speech';

function RemindList({ id, title, description, due, completed, handleClick, deleteTodo }) {
    const today = new Date();

    // Ensure `due` is a valid string and parse it to create a Date object
    const dueDate = due ? new Date(due) : null;
    const isExpired = dueDate ? dueDate < today : false;

    // Construct the speech text
    const speechText = `This reminder is titled ${title}. ${description}. It is due on ${due || "an unspecified date"}.`;

    return (
        <div className={isExpired ? "expired" : ""}>
            <h1>{title}</h1>
            <p>{description}</p>
            <p>Due Date: {due || "No due date provided"}</p>
            {isExpired && <p className="expired-message">This reminder is past due!</p>}
            <p>Completed: {completed ? "Yes" : "No"}</p>
            <button onClick={() => deleteTodo(id)}>Delete</button>
            <button onClick={() => handleClick({ id, title, description, due, completed })}>
                {completed ? "Undo" : "Complete"}
            </button>
            <Speech text={speechText} textAsButton={true} displayText="Read" />
        </div>
    );
}

export default RemindList;
