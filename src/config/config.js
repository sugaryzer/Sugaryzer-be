module.exports = {
  development: {
    url: process.env.DB_URL || 'postgres://username:password@localhost:port/dbname',
    dialect: 'postgres',
    dialectOptions: {
      ssl: false,
    },
  },
};