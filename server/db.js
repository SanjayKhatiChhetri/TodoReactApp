const { Pool } = require("pg");

require("dotenv").config();

// const pool = new Pool({
//   user: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   database: process.env.DB_DATABASE,
// });
const pool = new Pool({
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DATABASE,
  ssl: true,
});

module.exports = pool;
