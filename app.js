const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const melangeProductRouter = require('./routes/melangeProductRoutes');
const melangeRouter = require('./routes/melangeRoutes');

const app = express();
app.use(cors());

dotenv.config({path: './config.env'});
app.use(express.json());

if(process.env.NODE_ENV=='development'){
    const morgan = require('morgan')
    app.use(morgan('dev'));
  }
  console.log(process.cwd())

  // DOCKER
  app.use(express.static(process.cwd()+"/Front/dist/NWTA-Front/"))
  app.get('/', (req,res) => {
    res.sendFile(process.cwd()+"/Front/dist/NWTA-Front/index.html")
  });
  
app.use('/api/v1/users', userRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/melange', melangeRouter)
app.use('/api/v1/melangeProduct', melangeProductRouter)

module.exports = app;