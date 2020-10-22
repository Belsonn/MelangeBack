const express = require('express');
const dotenv = require('dotenv');
const userRouter = require('./routes/userRoutes');

const app = express();

dotenv.config({path: './config.env'});
app.use(express.json());

app.use('/api/v1/users', userRouter);


module.exports = app;