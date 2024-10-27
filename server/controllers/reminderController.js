import pool from '../models/reminderModel.js';

const addReminder = async (req, res) => {
    const { title, description, due } = req.body;
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


const deleteReminder = async(req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('DELETE FROM reminders WHERE id = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Reminder not found' });
        }
        res.status(200).json({ message: 'Reminder deleted successfully', reminder: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
};

export { addReminder, getReminders, deleteReminder };