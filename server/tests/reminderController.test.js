import { describe, it, expect } from 'vitest';
import request from 'supertest';
import express from 'express';
import { addReminder, getReminders, deleteReminder } from '../controllers/reminderController.js';

const app = express();
app.use(express.json());
app.post('/reminders', addReminder);
app.get('/reminders', getReminders);
app.delete('/reminders/:id', deleteReminder);

describe('Reminder API', () => {
    let createdReminderId;

    it('should create a reminder successfully', async () => {
        const response = await request(app)
            .post('/reminders')
            .send({
                title: 'Test Reminder',
                description: 'This is a test reminder',
                due: '2024-10-30'
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.title).toBe('Test Reminder');

        createdReminderId = response.body.id;
        expect(createdReminderId).toBeDefined();
    });

    it('should return a list of reminders', async () => {
        const response = await request(app).get('/reminders');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('should delete a reminder successfully', async () => {
        expect(createdReminderId).toBeDefined();
        const response = await request(app).delete(`/reminders/${createdReminderId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Reminder deleted successfully');
    });

    it('should return an error for non-existing reminder ID', async () => {
        const nonExistentId = 'non-existing-reminder-id';
        const response = await request(app).delete(`/reminders/${nonExistentId}`);
        expect(response.statusCode).toBe(500);
        expect(response.body).toHaveProperty('error', 'Internal Server Error');
    });
});