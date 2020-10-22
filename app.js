const express = require('express');
const dotenv = require('dotenv');

const app = express();

dotenv.config({path: './config.env'});
app.use(express.json());


module.exports = app;