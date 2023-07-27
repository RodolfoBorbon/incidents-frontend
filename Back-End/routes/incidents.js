//Back-End/routes/incidents.js

const express = require("express");
const router = express.Router();
const incidentController = require('../controllers/incidents');
var verifyToken = require("../middleware/authenticateToken")

// An example middleware function for authentication check
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { 
        return next(); 
    }
    res.status(401).send("Unauthorized");
}


router.post('/incident/create', incidentController.createIncident);
router.get('/incidents', incidentController.getAllIncidents);
router.get('/incidents/:id', incidentController.getIncidentById);
router.patch('/incidents/:id', incidentController.updateIncident);
router.delete('/incidents/:id', incidentController.deleteIncident);
router.patch('/incidents/close/:id', incidentController.closeIncident);
router.get('/closed-incidents', incidentController.getClosedIncidents);


module.exports = router;

