const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const Task = require('./api/models/todoListModel')

const port = process.env.PORT || 3000;

const app = express();

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tododb', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("we are connected to database");
})

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json());

// Import the routes and register the route
const routes = require('./api/routes/todoListRoutes');
routes(app);

app.listen(port);

console.log("Server has started... " + port);