const incidentModel = require('../models/incidentModel');

exports.createIncident = async (req, res) => {
  try {
    const incident = new incidentModel(req.body);
    await incident.validate(); 
    await incident.save();
    res.status(201).send({
      status: true,
      message: "Incident ticket Created!"
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getAllIncidents = async (req, res) => {
  try {
    const incidents = await incidentModel.find({});
    res.send(incidents);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getIncidentById = async (req, res) => {
  try {
    const _id = req.params.id;
    const incident = await incidentModel.findById(_id);
    if (!incident) {
      return res.status(404).send();
    }
    res.status(200).send(incident);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.updateIncident = async (req, res) => {
  try {
    const _id = req.params.id;
    const updateIncidents = await incidentModel.findByIdAndUpdate(_id, req.body, { new: true });
    if (!updateIncidents) {
      return res.status(404).send();
    }
    res.status(201).send({
      status: true,
      message: "Incident ticket updated!"
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteIncident = async (req, res) => {
  try {
    const _id = req.params.id;
    const deleteIncidents = await incidentModel.findByIdAndDelete(_id);
    if (!deleteIncidents) {
      return res.status(404).send();
    }
    res.status(201).send({
      status: true,
      message: "Incident ticket Deleted!"
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.closeIncident = async (req, res) => {
  try {
    const _id = req.params.id;
    const incident = await incidentModel.findByIdAndUpdate(_id, { $set: { status: "Closed" } }, { new: true });
    if (!incident) {
      return res.status(404).send();
    }
    res.status(200).send({
      status: true,
      message: "Incident closed successfully!",
      incident: incident
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getClosedIncidents = async (req, res) => {
  try {
    const closedIncidents = await incidentModel.find({ status: "Closed" });
    res.send(closedIncidents);
  } catch (error) {
    res.status(400).send(error);
  }
};
