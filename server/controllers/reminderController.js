import { collection, addDoc, getDocs, doc, deleteDoc } from 'firebase/firestore';
import db from '../FirebaseConfigBackend.js';

const addReminder = async (req, res) => {
    const { title, description, due, time} = req.body;
    try {
        const docRef = await addDoc(collection(db, "reminders"), {
            title,
            description,
            due,
            time
        });
        res.status(201).send({ id: docRef.id, title, description, due, time });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
};

const getReminders = async (req, res) => {
    try {
        const querySnapshot = await getDocs(collection(db, "reminders"));
        const reminders = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.send(reminders);
    } catch (err) {
        res.status(500).send(err);
    }
};

const deleteReminder = async (req, res) => {
    const { id } = req.params;
    try {
        await deleteDoc(doc(db, "reminders", id));
        res.status(200).json({ message: 'Reminder deleted successfully', id });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
};

export { addReminder, getReminders, deleteReminder};
