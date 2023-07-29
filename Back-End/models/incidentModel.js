//Back-End/model/incidentmodel.js

const mongoose = require("mongoose")
const bcrypt = require( 'bcrypt' );
const jwt = require("jsonwebtoken")
var Schema  = mongoose.Schema;

var incidentSchema = new Schema(
    {
        incidentRecordNumber: {    // a. New field
            type: String,
            required: true
        },
    incidentDescription: {
        type: String,
        required: true
    },
    incidentPriority: {
        type: String,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    customerPhoneNumber: {
        type: String,
        required: true
    },
    customerAddress: {
        type: String,
        required: true
    },
    incidentNarrative: {
        type: String,
        required: true
    },
    incidentStatus: {  // Incident status field
        type: String,
        default: "NEW" // Default value is "NEW"
    },
    incidentResolution: {  // Incident resolution field
        type: String,
        default: "" // Default value is empty string
    },
    closedDate: { // Field for the date when the incident was closed
        type: Date,
        default: null // Default value is null
    },
},
    { timestamps: true } // This will add created and updated fields automatically
  );
module.exports = mongoose.model('incident',incidentSchema);