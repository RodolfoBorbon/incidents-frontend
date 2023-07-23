
var incidentService = require('./incidentService');
var getDataControllerFunction = async (req, res) =>
{
    var incident = await incidentService.getDataFromDBService();
    res.send({ "status": true, "data": incident });
}
var createIncidentControllerFunction = async (req, res) => 
{
    var status = await incidentService.createIncidentDBService(req.body);
    if (status) {
        res.send({ "status": true, "message": "Incident created successfully" });
    } else {
        res.send({ "status": false, "message": "Error creating Incident" });
    }
}
var updateIncidentController = async (req, res) => 
{
    console.log(req.params.id);
    console.log(req.body);
     
    var result = await incidentService.updateIncidentDBService(req.params.id,req.body);
     if (result) {
        res.send({ "status": true, "message": "Incident Updated successfully"} );
     } else {
         res.send({ "status": false, "message": "Incident Updated Failed" });
     }
}
var deleteIncidentController = async (req, res) => 
{
     console.log(req.params.id);
     var result = await incidentService.removeIncidentDBService(req.params.id);
     if (result) {
        res.send({ "status": true, "message": "Incident record Deleted"} );
     } else {
         res.send({ "status": false, "message": "Incident Deletion failed" });
     }
}
module.exports = { getDataControllerFunction, createIncidentControllerFunction,updateIncidentController,deleteIncidentController };