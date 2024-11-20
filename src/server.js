require('dotenv').config();  // load enviroment var from .env
const express = require('express');
const app = express();

const cors = require('./middleware/cors.js');
const db = require('./models');

app.use(express.json()); // parse json request body
app.use(cors()); // apply cors

//ROUTERS
const productsRouter = require('./routes/products');
app.use('/products', productsRouter);
const groupsRouter = require('./routes/groups');
app.use('/groups', groupsRouter);
const recommendationsRouter = require('./routes/recommendations');
app.use('/recommendations', recommendationsRouter);
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);


const port = process.env.PORT;
// sync models with connected db
db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});