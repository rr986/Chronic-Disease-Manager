import { describe, it, expect } from 'vitest';
import request from 'supertest';
import express from 'express';
import { addReminder, getReminders, deleteReminder } from '../controllers/reminderController.js';

vi.mock('../FirebaseConfigBackend.js', () => ({
    __esModule: true,
    default: {
        collection: vi.fn(() => ({
            addDoc: vi.fn().mockResolvedValue({ id: 'mocked-id' }),
            getDocs: vi.fn().mockResolvedValue({
                docs: [
                    {
                        id: 'mocked-id',
                        data: () => ({ title: 'Mocked Reminder', description: 'Mocked Description', due: '2024-10-30' })
                    }
                ]
            }),
            doc: vi.fn().mockImplementation(() => ({
                deleteDoc: vi.fn().mockResolvedValue(),
            }))
        }))
    }
}));

const app = express();
app.use(express.json());
app.post('/reminders', addReminder);
app.get('/reminders', getReminders);
app.delete('/reminders/:id', deleteReminder);

describe('Reminder API with Mocked DB', () => {
    it('should create a reminder successfully', async () => {
        const response = await request(app)
            .post('/reminders')
            .send({
                title: 'Mocked Test Reminder',
                description: 'This is a mocked test reminder',
                due: '2024-10-30'
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id', 'mocked-id');
    });

    it('should return a list of reminders', async () => {
        const response = await request(app).get('/reminders');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0]).toHaveProperty('title', 'Mocked Reminder');
    });

    it('should delete a reminder successfully', async () => {
        const response = await request(app).delete('/reminders/mocked-id');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Reminder deleted successfully');
    });
});
