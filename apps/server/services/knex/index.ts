import fp from "fastify-plugin";
import Knex from "knex";
import knexfile from "./knexfile";

type NodeEnv = "production" | "development" | "test";

export function knexService() {
  return fp(async (fastify, _opts) => {
    const env = (process.env.NODE_ENV ?? "development") as NodeEnv;
    const knex = Knex(knexfile[env]);

    fastify.decorate("knex", knex);
  });
}
