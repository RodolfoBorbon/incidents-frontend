
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var incidentSchema = new Schema({

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
    }
});

module.exports = mongoose.model('incidents', incidentSchema);