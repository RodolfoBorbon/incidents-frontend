const express = require("express");
const router = express.Router();
const incidentController = require('../controllers/incidents');

router.post('/incident/create', incidentController.createIncident);
router.get('/incidents', incidentController.getAllIncidents);
router.get('/incidents/:id', incidentController.getIncidentById);
router.patch('/incidents/:id', incidentController.updateIncident);
router.delete('/incidents/:id', incidentController.deleteIncident);
router.patch('/incidents/close/:id', incidentController.closeIncident);
router.get('/closed-incidents', incidentController.getClosedIncidents);

module.exports = router;

