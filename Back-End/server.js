var express = require('express');
var server = express();
var routes = require('./routes/routes');
var mongoose = require('mongoose');
const cors = require('cors');

// set up the database connection
mongoose.connect('mongodb+srv://rodolfoborbon:teknu6-dibJod-kuqvyn@cluster0.8ndpeek.mongodb.net/Incident_Management_App?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Database connection successful!');
})
.catch((error) => {
    console.error('Error connecting to the database:', error);
});

server.use(express.json());
server.use(routes);
server.use(cors());

// set the port where the server will listen
server.listen(4200, function check(error) {
    if (error) {
        console.log("Error");
    } else {
        console.log("Success");
    }
});
