import pool from '../models/reminderModel.js';

const addReminder = async (req, res) => {
    const { title, description, due } = req.body;
    
    if (!title || !due) {
        return res.status(400).json({ error: 'Title and due date are required' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO reminders (title, description, due) VALUES ($1, $2, $3) RETURNING *',
            [title, description, due]
        );
        res.status(201).send(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
};


const getReminders = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM reminders');
        res.send(result.rows);
    } catch (err) {
        res.status(500).send(err);
    }
};

export { addReminder, getReminders };