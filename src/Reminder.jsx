import React, { useState, useEffect, useContext } from 'react';
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  Timestamp,
} from 'firebase/firestore';
import db from './firebase/reminderModel.js';
import AddReminder from './AddReminder';
import RemindList from './RemindList';
import { AuthContext } from './context/AuthContext';
import './App.css';

function Reminder() {
  const { currentUser } = useContext(AuthContext);
  const [reminders, setReminders] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  if (!currentUser) {
    return <p>Please log in to view and add reminders.</p>;
  }

  const remindersCollectionRef = collection(
    db,
    'users',
    currentUser.uid,
    'reminders'
  );

  // Fetch reminders from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(
      remindersCollectionRef,
      (snapshot) => {
        const remindersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReminders(remindersData);
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching reminders:', err);
        setError('Failed to fetch reminders.');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [remindersCollectionRef]);

  // Function to add a reminder to Firestore
  const addReminder = async (title, description, due, time) => {
    try {
      // Validation
      if (!title || typeof title !== 'string' || title.trim().length < 5) {
        throw new Error('Title must be at least 5 characters.');
      }
      if (!description || typeof description !== 'string' || description.trim().length < 5) {
        throw new Error('Description must be at least 5 characters.');
      }
      if (!due || typeof due !== 'string' || !due.includes('-')) {
        throw new Error('Due date is not formatted properly.');
      }
      if(!time || typeof time !== 'string' || !time.includes(':')){
        throw new Error('Time is not formatted properly');
      }

      const dueDate = new Date(`${due}T${time}:00`); // Parse `due` with `time` as local time
      const formattedDueDate = `${(dueDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}/${dueDate
        .getDate()
        .toString()
        .padStart(2, '0')}/${dueDate.getFullYear()}`;

       const newReminder = {
         title: title.trim(),
         description: description.trim(),
         due: formattedDueDate,
         time:time.trim(),
         completed: false,
         createdAt: Timestamp.now(),
       };

       console.log('Attempting to add reminder to Firestore:');
       console.log('New Reminder Data:', newReminder);
       console.log('Firestore Collection Path:', remindersCollectionRef.path);

       await addDoc(remindersCollectionRef, newReminder);

       console.log('Reminder added to Firestore successfully');
     } catch (error) {
       console.error('Error adding reminder:', error);
       alert(`Error adding reminder: ${error.message}`);
       throw error; // Re-throw the error to be caught by calling function
     }
  };

  // Function to toggle completed status
  const toggleCompleted = async (reminder) => {
    try {
      const reminderDoc = doc(
        db,
        'users',
        currentUser.uid,
        'reminders',
        reminder.id
      );
      await updateDoc(reminderDoc, { completed: !reminder.completed });
    } catch (error) {
      console.error('Error toggling completed status:', error);
      setError('Failed to update reminder.');
    }
  };

  // Function to delete a reminder
  const deleteReminder = async (id) => {
    try {
      const reminderDoc = doc(
        db,
        'users',
        currentUser.uid,
        'reminders',
        id
      );
      await deleteDoc(reminderDoc);
    } catch (error) {
      console.error('Error deleting reminder:', error);
      setError('Failed to delete reminder.');
    }
  };

  return (
    <div className="reminder-container">
      <h1>Reminder List</h1>

      {loading && <p>Loading reminders...</p>}
      {error && <p className="error">{error}</p>}

      {/* Reminder Items */}
      <div className="reminder-list">
        {reminders.length > 0 ? (
          reminders.map((reminder) => (
            <RemindList
              key={reminder.id}
              {...reminder}
              handleClick={toggleCompleted}
              deleteReminder={deleteReminder}
            />
          ))
        ) : (
          <p>No reminders found. Add a new reminder below.</p>
        )}
      </div>

      {/* Add Reminder Section */}
      <div className="footer">
        <h2>Add New Reminder</h2>
        <AddReminder add_func={addReminder} />
      </div>
    </div>
  );
}

export default Reminder;

