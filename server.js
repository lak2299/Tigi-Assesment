import dotenv from 'dotenv'
const express = require('express');
const server = express();
const http = require('http');
const path = require('path');
const cookieParser = require('cookie-parser');
import users from './handlers/users'
import transactions from './handlers/transactions'
import storage from './handlers/storage';
import { socketEvents } from "./sockets/sockets";
import auth from './handlers/auth';
import testingEvents from './sockets/data-test';
const session = require('express-session');
const bodyParser = require('body-parser');

const fileupload = require("express-fileupload");
server.use(fileupload());

var cors = require('cors');

// Load environment variables for .env file if there is one

dotenv.config();

const db = require("./db");


const passport = require('passport');
const morgan = require('morgan');

var env = process.env.NODE_ENV || 'development';
const config = require('./saml-config/config')[env];

require('./saml-config/passport')(passport, config);


server.use(cookieParser());
server.use(express.json());
server.use(morgan('combined'));
server.use(express.urlencoded({extended: false}));
server.use(session(
    {
        resave: true,
        saveUninitialized: true,
        secret: 'this shit hits'
    }));

server.use(cors({
    origin: process.env.CORS_ORIGIN || '*'
}));

server.use(passport.initialize());
server.use(passport.session());

require('./saml-config/passport-routes')(server, config, passport, passport.samlStrategy);

// Middleware to log req.query, req.body, and req.params
const loggerMiddleware = (req, res, next) => {
    console.log('*****************API INFO START*************************')
    console.log('Request Path:', req.path);
    console.log('Query Parameters:', req.query);
    console.log('Body Parameters:', req.body);
    console.log('Route Parameters:', req.params);
    console.log(' ')
    return next();
};

// Use middleware for all routes
server.use(loggerMiddleware);

// Create Routes
users(server);
transactions(server);
storage(server);
socketEvents(server,db);
auth(server);
testingEvents(server);
// Server Listen
server.listen(process.env.port || process.env.PORT || 3000, () => {
    console.log('%s listening to %s', server.name, 3000)
});

