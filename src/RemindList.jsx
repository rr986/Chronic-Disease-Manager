function RemindList({ id, title, description, due, completed, handleClick, deleteTodo }) {
    const today = new Date();
    
    // Ensure `due` is defined and split is only called if `due` is a valid string
    const dueArr = due ? due.split("/") : [];
    const day = dueArr[1] ? String(dueArr[1]).padStart(2, '0') : "01"; // Default to "01" if missing
    const month = dueArr[0] ? String(dueArr[0]).padStart(2, '0') : "01"; // Default to "01" if missing
    const year = dueArr[2] ? dueArr[2] : today.getFullYear(); // Use current year if missing

    const dueDate = new Date(`${year}-${month}-${day}`);
    
    const isExpired = dueDate < today;

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
        </div>
    );
}

export default RemindList;