const env = require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');
const passport = require('./strategies/user.strategy');
const sessionConfig = require('./modules/session-middleware');

// Listening on port
var port = process.env.PORT;

//DB Module
const db = require('./modules/db.config.js');

// Route includes
const userRouter = require('./routes/user.router');
const photoRouter = require('./routes/photo.router');
const reviewRouter = require('./routes/review.router');
const favoriteRouter = require('./routes/favorite.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration
app.use(sessionConfig);

// Start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user/', userRouter);
app.use('/api/user/', photoRouter);
app.use('/api/user/', reviewRouter);
app.use('/api/user/', favoriteRouter);

// Serve static files
app.use(express.static('server/public'));

/** Listen * */
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
