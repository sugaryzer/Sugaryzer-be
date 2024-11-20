module.exports = {
  development: {
    url: process.env.DB_URL || 'postgres://username:password@localhost:port/dbname',
    port: process.env.DB_PORT,
    dialect: 'postgres',
    dialectOptions: {
      ssl: false,
    },
  },
};