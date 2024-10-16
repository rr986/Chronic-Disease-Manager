function ChronCondList(props, deleteTodo) {
    if(!props.completed){
        let d = null;
        let today = new Date();
        let due_arr = props.Checkup.split("/");
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
        let Checkup_date = due_arr[2] + '-' + month + '-' + day;
        let CheckupDate = new Date(Checkup_date);
        d = <p>Last Checkup Date: {props.Checkup}</p>;
        
        return (
            <div>
                <h1>{props.Condition}</h1>
                <p>{d}</p>
                <button onClick={() => deleteTodo(props.id)}>Delete</button>
                
                
            </div>
        );
    }
}
export default ChronCondList;