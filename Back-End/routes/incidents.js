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


router.post('/incident/create', verifyToken, incidentController.createIncident);
router.get('/incidents', verifyToken, incidentController.getAllIncidents);
router.get('/incidents/:id', verifyToken, incidentController.getIncidentById);
router.patch('/incidents/:id', verifyToken, incidentController.updateIncident);
router.delete('/incidents/:id', verifyToken, incidentController.deleteIncident);
router.patch('/incidents/close/:id', verifyToken, incidentController.closeIncident);
router.get('/closed-incidents', verifyToken, incidentController.getClosedIncidents);


module.exports = router;

