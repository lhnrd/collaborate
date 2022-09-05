import dotenv from "dotenv";
import path from "path";

dotenv.config();

const databaseFilename = process.env.SQLITE_FILENAME ?? "database";

const config = {
  client: "sqlite3",
  connection: {
    filename: path.join(__dirname, `./${databaseFilename}.sqlite3`),
  },
  migrations: {
    directory: path.join(__dirname, "./migrations"),
    extension: "ts",
  },
  seeds: {
    directory: path.join(__dirname, "./seeds"),
    extension: "ts",
  },
  useNullAsDefault: true,
  debug: true,
};

export default {
  development: config,
  test: config,
  production: config,
};
