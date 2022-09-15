import config from "config";
import { Knex } from "knex";
import path from "path";

const cfg: Knex.Config = {
  client: "pg",
  connection: {
    host: config.get("Database.host"),
    port: config.get("Database.port"),
    user: config.get("Database.user"),
    password: config.get("Database.password") ?? undefined,
    database: config.get("Database.name"),
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
  development: cfg,
  test: cfg,
  production: cfg,
};
