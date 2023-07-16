//11. Define the model schema for product survey
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSurveySchema = new Schema({
  taste: { type: Number, min: 1, max: 5 },
  flavor: { type: Number, min: 1, max: 5 },
  packaging: { type: Number, min: 1, max: 5 },
  price: { type: Number, min: 1, max: 5 },
  availability: { type: Number, min: 1, max: 5 },
  nutrition: { type: Number, min: 1, max: 5 },
  variety: { type: Number, min: 1, max: 5 },
  overallSatisfaction: { type: Number, min: 1, max: 5 }
});

const ProductSurvey = mongoose.model('ProductSurvey', productSurveySchema);

module.exports = ProductSurvey;