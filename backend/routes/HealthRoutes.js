const express = require("express");
const router = express.Router();
const healthController = require("../controllers/HealthController");

router.post("/save", healthController.saveHealthData);
router.get("/get", healthController.getHealthData);
router.put("/update/:id", healthController.updateHealthData);
router.delete("/delete/:id", healthController.deleteHealthData);

module.exports = router;
