const { Sequelize } = require('sequelize');

// create sequelize instance and its config
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'dbname',
  logging: false,
  port: process.env.DB_PORT || 5432,
});

module.exports = sequelize;