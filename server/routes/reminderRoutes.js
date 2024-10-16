import express from 'express';
import { addReminder, getReminders } from '../controllers/reminderController.js';

const router = express.Router();

router.post('/reminders', addReminder);

router.get('/reminders', getReminders);

export default router;