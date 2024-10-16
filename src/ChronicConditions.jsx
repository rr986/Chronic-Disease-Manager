import './App.css';
import AddChronicHealth from './AddChronicHealth';
import ChronCondList from './ChronicCondList';
import { useState } from 'react';

let testC = {
  id: 1,
  Condition: 'No Chronic Conditions',
  Checkup: '10/24/2024',
  };
let count = 1;
let cond = [];
function ChronicConditions() {
  //const [tem, setRem] = useState("Buy groceries");
  const [Conds, setHel] = useState(cond);
    function deleteHealth(id) {
        setHel(Conds.filter(t => t.id !== id))
      };
      function toggleCompleted (condition) {
        setHel(Conds.map(t => {
            if (t.id === condition.id){
                return {...t, completed: !t.completed};
            }
            else{
                return t;
            }
        }));
      };
      function addHealth (condit, check){
        if (!condit) throw "Error: Condition Missing";
        if (typeof condit !== 'string') throw "Error: Condition must be a string";
        if (condit.trim().length < 3) throw "Error: Condition must be at least 3 characters.";
        condit = condit.trim();
    
        if (!check) throw "Error: Due Date Missing";
        if (typeof check !== 'string') throw "Error: Due Date must be a string.";
        if (!check.includes('-')) throw "Error: Due Date is not formatted properly.";
        let due_arr = check.split('-');
        let due_str =  due_arr[1] + '/' + due_arr[2] + '/' + due_arr[0];
        let due_date = null;
        try {
          due_date = new Date(check);
        } catch(e){
          throw "Error: Due Date is not formatted properly.";
        };
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        if (due_date.getTime() > today.getTime()) {
          throw "Error: Checkup Date cannot be in the future.";
      }
    
        let new_hel = {
          id: count + 1,
          Condition: condit,
          Checkup: due_str
        };
        count +=1;
        setHel((prevState) => [...prevState, new_hel]);
      }
      
  return (
    <div> 
        <h1>Chronic Condition List</h1>
        {Conds.map(function(t) {return ChronCondList(t, deleteHealth)})}
        <div className='footer'>
            <h1>Add New Chron Conds</h1>
                {AddChronicHealth(addHealth)}
        </div>
    </div>
    
  );
}

export default ChronicConditions;
