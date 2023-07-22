const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const incidentReportSchema = new Schema({
  incidentDescription: { type: String, required: true },
  incidentPriority: { type: String, required: true },
  customerName: { type: String, required: true },
  customerPhoneNumber: { type: String, required: true },
  customerAddress: { type: String, required: true },
  incidentNarrative: { type: String, required: true },
});

const user = mongoose.model("Incident", incidentReportSchema);
module.exports = user;
