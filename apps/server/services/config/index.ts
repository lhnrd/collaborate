import * as dotenv from "dotenv";
import "fastify";
import fp from "fastify-plugin";

dotenv.config();

type NodeEnv = "production" | "development" | "test";

const env = (process.env.NODE_ENV ?? "development") as NodeEnv;
const port = process.env.SERVER_PORT;
const host = process.env.SERVER_HOST;
const database = process.env.SQLITE_FILENAME;

export const config = { database, env, port, host };

declare module "fastify" {
  /* eslint-disable @typescript-eslint/consistent-type-definitions */
  /* Declaration mergin has to be with an interface  */
  interface FastifyInstance {
    config: typeof config;
  }
  /* eslint-enable @typescript-eslint/consistent-type-definitions */
}

export const configService = fp(async (fastify) => {
  fastify.decorate("config", { database, env, port, host });
});
