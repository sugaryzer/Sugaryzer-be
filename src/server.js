require('dotenv').config();
const express = require('express');
const cors = require('./middleware/cors.js');
const app = express();

// parse json request body
app.use(express.json());

// apply cors
app.use(cors());

//ROUTERS
const productsRouter = require('./routes/products');
app.use('/products', productsRouter);
const groupsRouter = require('./routes/groups');
app.use('/groups', groupsRouter);
const recommendationsRouter = require('./routes/recommendations');
app.use('/recommendations', recommendationsRouter);
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Running on port ${port}`);
});