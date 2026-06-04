require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });
const knex = require("knex");
const config = require("./knexfile");

const db = knex(config.development);

module.exports = db;
