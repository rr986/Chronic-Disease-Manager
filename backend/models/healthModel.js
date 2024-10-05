// Defines the schema for health data stored in the database using SQL.
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./healthData.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Create HealthData table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS HealthData (

)`);

module.exports = db;
