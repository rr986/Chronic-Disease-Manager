const db = require("../models/healthModel");

// Save health data (Insert)
exports.saveHealthData = (req, res) => {

};

// Get all health data (Select)
exports.getHealthData = (req, res) => {

};

// Update health data by ID (Update)
exports.updateHealthData = (req, res) => {
  const { id } = req.params;
  const { bloodPressure, glucoseLevels } = req.body;
  const sql = `UPDATE HealthData SET bloodPressure = ?, glucoseLevels = ?, lastUpdated = CURRENT_TIMESTAMP WHERE id = ?`;


};

// Delete health data by ID (Delete)
exports.deleteHealthData = (req, res) => {

};
