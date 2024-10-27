import { useState, useEffect} from 'react';
import AddReminder from './AddReminder';
import './App.css';
import RemindList from './RemindList';

let count = 1;
let test = {
    id: 1,
    title: 'Take medication',
    description: 'Take <insert speicifc medicine here> on October 24th',
    due: '10/24/2024',
    completed: false
    };
let remind = [test];
function Reminder() {
    const [reminders, setRemind] = useState([]);
    useEffect(() => {
      const fetchReminders = async () => {
          try {
              const response = await fetch('http://localhost:3001/reminders'); // Update URL based on your server
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              const data = await response.json();
              if (Array.isArray(data)) {
                setRemind(data);
            } else {
                console.error('Fetched data is not an array:', data);
            }
          } catch (error) {
              console.error('Error fetching reminders:', error);
          }
      };

      fetchReminders();
  }, []);
    function deleteReminder (id) {
        setRemind(reminders.filter(t => t.id !== id))
      };
    function toggleCompleted (reminder) {
        setRemind(reminders.map(t => {
            if (t.id === reminder.id){
                return {...t, completed: !t.completed};
            }
            else{
                return t;
            }
        }));
    };
      const addReminder = async (title, description, due) => {
        if (!title) throw "Error: Title Missing";
        if (typeof title !== 'string') throw "Error: Title must be a string";
        if (title.trim().length < 5) throw "Error: Title must be at least 5 characters.";
        title = title.trim();
        
        console.log(description);
        if (!description) throw "Error: Description Missing";
        if (typeof description !== 'string') throw "Error: Description must be a string";
        if (description.trim().length < 5) throw "Error: Description must be at least 5 characters.";
        description = description.trim();
    
        if (!due) throw "Error: Due Date Missing";
        if (typeof due !== 'string') throw "Error: Due Date must be a string.";
        if (!due.includes('-')) throw "Error: Due Date is not formatted properly.";
        let due_arr = due.split('-');
        let due_str =  due_arr[1] + '/' + due_arr[2] + '/' + due_arr[0];
        let due_date = null;
        try {
          due_date = new Date(due);
        } catch(e){
          throw "Error: Due Date is not formatted properly.";
        };
        let today = new Date();
        if (!(due_date.getDate >= today.getDate)) throw "Error: Due date cannot have already passed.";
    
        let new_remind = {
          id: count + 1,
          title: title,
          description: description,
          due: due_str,
          completed: false
        };
        count +=1;
        try {
          const response = await fetch('http://localhost:3001/reminders', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(new_remind),
          });

          if (!response.ok) {
            const errorData = await response.json();
            console.error('Error response:', errorData);
            throw new Error('Failed to add reminder: ' + errorData.error);
          }

          const addedReminder = await response.json();
          //return addedReminder;
          setRemind((prevState) => [...prevState, addedReminder]);
      } catch (error) {
        console.error('Error adding reminder:', err);
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
      }
  };
        //setRemind((prevState) => [...prevState, new_remind]);
    let rem = "Blank Reminder for testing";
    return (
    <div> 
        <h1>Reminder List</h1>
        {reminders.map(t => (
                <RemindList 
                    key={t.id} // Unique key for each reminder
                    {...t} // Spread reminder properties
                    handleClick={toggleCompleted} 
                    deleteTodo={deleteReminder} 
                />
            ))}
        <div className='footer'>
            <h1>Add New Reminders</h1>
                {AddReminder(addReminder)}
        </div>
    </div>
    );
}

export default Reminder;