import express from 'express';
import { addReminder, getReminders } from '../controllers/reminderController.js';

const router = express.Router();

router.post('/', addReminder);

router.get('/', getReminders);

export default router;