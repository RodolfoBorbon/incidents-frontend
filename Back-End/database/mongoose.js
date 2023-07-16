const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://rodolfoborbon:teknu6-dibJod-kuqvyn@cluster0.8ndpeek.mongodb.net/Survey-App?retryWrites=true&w=majority')
  .then(() => console.log("Database Conected"))
  .catch((error) => console.log(error));

module.exports = mongoose;


