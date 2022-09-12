import fp from "fastify-plugin";
import Knex from "knex";
import { Model } from "objection";
import knexfile from "./knexfile";

type NodeEnv = "production" | "development" | "test";

export const knexService = fp(async (fastify) => {
  const env = (process.env.NODE_ENV ?? "development") as NodeEnv;
  const knex = Knex(knexfile[env]);

  Model.knex(knex);

  fastify.decorate("knex", knex);
});
