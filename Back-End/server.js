var express = require('express');
var server = express();
var routes = require('./routes/routes');
var mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require("body-parser")

const app = express()
const port = 4800

// set up the database connection
const mongodatabaseURL = 'mongodb+srv://rodolfoborbon:teknu6-dibJod-kuqvyn@cluster0.8ndpeek.mongodb.net/Incident_Management_App?retryWrites=true&w=majority';

mongoose.connect(mongodatabaseURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const connection = mongoose.connection
app.listen(port,()=>{
    console.log("Server is running port " + port);
})
connection.once("open",()=>{
    console.log("MongoDb Connected......")
});
app.use(cors());
app.use(bodyParser.json());
app.use(routes);


