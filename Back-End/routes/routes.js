var express = require('express');
const router = express.Router();

var incidentController = require('../src/incident/incidentController');

router.route('/incident/getAll').get(incidentController.getDataControllerFunction);

router.route('/incident/create').post(incidentController.createIncidentControllerFunction);

router.route('/incident/update/:id').patch(incidentController.updateIncidentController);

router.route('/incident/delete/:id').delete(incidentController.deleteIncidentController);

module.exports = router;

