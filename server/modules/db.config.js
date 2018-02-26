const mongoose = require('mongoose');

// Mongo Connection //
let mongoURI = 'mongodb://park-stop:nationalpark@ds249398.mlab.com:49398/park-stop';

// process.env.MONGODB_URI will only be defined if you
// are running on Heroku
if (process.env.MONGODB_URI != undefined) {
    // use the string value of the environment variable
    mongoURI = process.env.MONGODB_URI;
} else {
    // use the local database server
    mongoURI = 'mongodb://localhost:27017/park-stop';
}

mongoose.connect(mongoURI, {
    useMongoClient: true
});

mongoose.connection.on('error', function (err) {
    if (err) {
        console.log("MONGO ERROR: ", err);
    }
    // res.sendStatus(500);
});

mongoose.connection.on('open', function () {
    console.log("Connected to Mongo!");
});

module.exports = mongoose;