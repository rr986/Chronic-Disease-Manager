import Speech from 'react-speech'
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
        let speechText = 'You have ' + props.Condition + '. Your last checkup was ' + Checkup_date;
        return (
            <div>
                <h1>{props.Condition}</h1>
                <p>{d}</p>
                <button onClick={() => deleteTodo(props.id)}>Delete</button>
                {/* <button onClick={() =>  readToDo(props.Condition,d)}>Read</button> */}
                <Speech text = {speechText}
                textAsButton={true}    
                displayText="Read"/>
                
            </div>
        );
    }
}
export default ChronCondList;
