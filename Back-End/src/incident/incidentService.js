var incidentModel = require('./incidentModel');

module.exports.getDataFromDBService = async () => {
    try {
        const result = await incidentModel.find();
        return result;
    } catch (error) {
        throw error;
    }
};

module.exports.createIncidentDBService = async (incidentDetails) => {
    try {
        var incidentModelData = new incidentModel();

        incidentModelData.incidentDescription = incidentDetails.incidentDescription;
        incidentModelData.incidentPriority = incidentDetails.incidentPriority;
        incidentModelData.customerName = incidentDetails.customerName;
        incidentModelData.customerPhoneNumber = incidentDetails.customerPhoneNumber;
        incidentModelData.customerAddress = incidentDetails.customerAddress;
        incidentModelData.incidentNarrative = incidentDetails.incidentNarrative; // Fixed typo here

        const result = await incidentModelData.save();
        return true;
    } catch (error) {
        throw error;
    }
};

module.exports.updateIncidentDBService = async (id, incidentDetails) => {
    try {
        console.log(incidentDetails);
        const result = await incidentModel.findByIdAndUpdate(id, incidentDetails);
        return result;
    } catch (error) {
        throw error;
    }
};

module.exports.removeIncidenDBService = async (id) => {
    try {
        const result = await incidentModel.findByIdAndDelete(id);
        return result;
    } catch (error) {
        throw error;
    }
};
