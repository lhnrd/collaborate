import "fastify";
import fp from "fastify-plugin";
import Knex, { Knex as KnexType } from "knex";
import { Model } from "objection";
import knexfile from "./knexfile";

declare module "fastify" {
  /* eslint-disable @typescript-eslint/consistent-type-definitions */
  /* Declaration mergin has to be with an interface  */
  interface FastifyInstance {
    knex: KnexType;
  }
  /* eslint-enable @typescript-eslint/consistent-type-definitions */
}

type NodeEnv = "development" | "production" | "test";

export const knexService = fp(async (fastify) => {
  const env: NodeEnv = fastify.config.get("environment");
  const knex = Knex(knexfile[env]);

  Model.knex(knex);

  fastify.decorate("knex", knex);

  fastify.addHook("onClose", (fastify, done) => {
    if (fastify.knex === knex) {
      fastify.knex.destroy(done);
    }
  });
});
