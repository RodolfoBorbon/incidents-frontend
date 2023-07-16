//11. Define the model schema for banking survey

const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const bankingSurveySchema = new Schema({
  easeOfUse: { type: Number, min: 1, max: 5 },
  customerService: { type: Number, min: 1, max: 5 },
  security: { type: Number, min: 1, max: 5 },
  accountFeatures: { type: Number, min: 1, max: 5 },
  interestRates: { type: Number, min: 1, max: 5 },
  feesAndCharges: { type: Number, min: 1, max: 5 },
  onlineAndMobileBanking: { type: Number, min: 1, max: 5 },
  overallSatisfaction: { type: Number, min: 1, max: 5 }
});

const BankingSurvey = mongoose.model('BankingSurvey', bankingSurveySchema);

module.exports = BankingSurvey;

