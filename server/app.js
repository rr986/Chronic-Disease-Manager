import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import reminderRoutes from './routes/reminderRoutes.js';

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(reminderRoutes);

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});