const Incident = require("../database/models/incidentreport");

// Controller functions for incident creation, update, management, etc.

// Function to create a new incident
exports.createIncident = async (req, res) => {
  try {
    const {
      incidentDescription,
      incidentPriority,
      customerName,
      customerPhoneNumber,
      customerAddress,
      incidentNarrative,
    } = req.body;

    // Create a new incident object
    const newIncident = new Incident({
      incidentDescription,
      incidentPriority,
      customerName,
      customerPhoneNumber,
      customerAddress,
      incidentNarrative,
    });

    // Save the incident to the database
    await newIncident.save();

    res
      .status(201)
      .json({
        message: "Incident created successfully",
        incident: newIncident,
      });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Function to update the status and add a comment to an incident
exports.updateIncidentStatus = async (req, res) => {
  try {
    const { incidentId, status, comment } = req.body;

    // Find the incident by its ID
    const incident = await Incident.findById(incidentId);
    if (!incident) {
      return res.status(404).json({ message: "Incident not found" });
    }

    // Update the status and add the comment to the incident
    incident.status = status;
    incident.incidentNarrative.push({
      timestamp: new Date(),
      status,
      comment,
    });

    await incident.save();

    res
      .status(200)
      .json({ message: "Incident status updated successfully", incident });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Function to get all incidents
exports.getAllIncidents = async (req, res) => {
  try {
    // Fetch all incidents from the database
    const incidents = await Incident.find();

    res.status(200).json({ incidents });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Function to get all open incidents
exports.getAllOpenIncidents = async (req, res) => {
  try {
    // Fetch open incidents from the database based on status
    const openIncidents = await Incident.find({ status: { $ne: "CLOSED" } });

    res.status(200).json({ openIncidents });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Function to get an incident by ID
exports.getIncidentById = async (req, res) => {
  try {
    const { incidentId } = req.params;

    // Find the incident by its ID
    const incident = await Incident.findById(incidentId);
    if (!incident) {
      return res.status(404).json({ message: "Incident not found" });
    }

    res.status(200).json({ incident });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
