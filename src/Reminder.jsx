import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import db from './firebase/reminderModel.js'; // Import Firestore instance
import AddReminder from './AddReminder';
import './App.css';
import RemindList from './RemindList';

function Reminder() {
  const [reminders, setReminders] = useState([]);

  // Fetch reminders from Firestore on component mount
  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'reminders'));
        const remindersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setReminders(remindersData);
      } catch (error) {
        console.error('Error fetching reminders:', error);
      }
    };

    fetchReminders();
  }, []);

  // Function to add a reminder to Firestore
  const addReminder = async (title, description, due) => {
    try {
      if (!title || typeof title !== 'string' || title.trim().length < 5) {
        throw new Error('Title must be at least 5 characters.');
      }
      if (!description || typeof description !== 'string' || description.trim().length < 5) {
        throw new Error('Description must be at least 5 characters.');
      }
      if (!due || typeof due !== 'string' || !due.includes('-')) {
        throw new Error('Due date is not formatted properly.');
      }

      const newReminder = { title: title.trim(), description: description.trim(), due };
      const docRef = await addDoc(collection(db, 'reminders'), newReminder);
      setReminders(prevReminders => [...prevReminders, { id: docRef.id, ...newReminder }]);
    } catch (error) {
      console.error('Error adding reminder:', error);
    }
  };

  // Function to toggle completed status (kept for future use if needed)
  const toggleCompleted = (reminder) => {
    setReminders(reminders.map(t => {
      if (t.id === reminder.id) {
        return { ...t, completed: !t.completed };
      }
      return t;
    }));
  };

  // Function to delete a reminder
    const deleteReminder = async (id) => {
      try {
        // Deletes the document from Firestore
        await deleteDoc(doc(db, 'reminders', id));
        // Updates local state
        setReminders(reminders.filter(t => t.id !== id));
      } catch (error) {
        console.error('Error deleting reminder:', error);
      }
    };

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
        <AddReminder add_func={addReminder} />
      </div>
    </div>
  );
}

export default Reminder;
