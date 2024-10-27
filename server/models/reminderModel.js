import pkg from 'pg';  
const { Pool } = pkg;  

const pool = new Pool({
    user: 'postgres',
    host: '192.168.1.100',
    database: 'reminders',
    password: 'elderecho',
    port: 5432
});

export default pool;