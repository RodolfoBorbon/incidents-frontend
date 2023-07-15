let mongoose = require('mongoose');

// create a model class
let surveyModel = mongoose.Schema({
    name: String,
    occupation: String,
    attitude: String,
    gender: String,
    feedback: String
},
{
    collection: "surveys"
});

module.exports = mongoose.model('Survey', surveyModel);