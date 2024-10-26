function RemindList({ id, title, description, due, completed, handleClick, deleteTodo }) {
    const today = new Date();
    const dueArr = due.split("/");
    const day = String(dueArr[1]).padStart(2, '0'); // Ensure day is two digits
    const month = String(dueArr[0]).padStart(2, '0'); // Ensure month is two digits
    const dueDate = new Date(`${dueArr[2]}-${month}-${day}`);
    
    const isExpired = dueDate < today;

    return (
        <div className={isExpired ? "expired" : ""}>
            <h1>{title}</h1>
            <p>{description}</p>
            <p>Due Date: {due}</p>
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