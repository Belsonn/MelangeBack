const express = require('express');
const dotenv = require('dotenv');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const melangeProductRouter = require('./routes/melangeProductRoutes');
const melangeRouter = require('./routes/melangeRoutes');

const app = express();

dotenv.config({path: './config.env'});
app.use(express.json());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/melange', melangeRouter)
app.use('/api/v1/melangeProduct', melangeProductRouter)

module.exports = app;