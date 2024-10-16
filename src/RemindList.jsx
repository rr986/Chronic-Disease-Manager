function RemindList(props, handleClick, deleteTodo) {
    if(!props.completed){
        let d = null;
        let today = new Date();
        let due_arr = props.due.split("/");
        let day = null;
        if (due_arr[1] < 10){
            day = '0' + due_arr[1];
        }
        else {
            day = due_arr[1];
        }
        let month = null;
        if (due_arr[0] < 10){
            month = '0' + due_arr[0];
        }
        else {
            month = due_arr[0];
        }
        let due_date = due_arr[2] + '-' + month + '-' + day;
        let due = new Date(due_date);
        if (due < today){
            d = <div className="expired"><p>Due Date: {props.due}</p></div>;
        }
        else{
            d = <p>Due Date: {props.due}</p>;
        }
        return (
            <div>
                <h1>{props.title}</h1>
                <p>{props.description}</p>
                {d}
                <p>Completed: No</p>
                <button onClick={() => deleteTodo(props.id)}>Delete</button>
                <button onClick={() => handleClick(props)}>Complete</button>
                
            </div>
        );
    }
};
export default RemindList;