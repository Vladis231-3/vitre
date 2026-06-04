require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      directory: require("path").join(__dirname, "..", "migrations"),
    },
    seeds: {
      directory: require("path").join(__dirname, "..", "seeds"),
    },
  },
};
