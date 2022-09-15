import config from "config";
import "fastify";
import fp from "fastify-plugin";

declare module "fastify" {
  /* eslint-disable @typescript-eslint/consistent-type-definitions */
  /* Declaration merging has to be with an interface  */
  interface FastifyInstance {
    config: typeof config;
  }
  /* eslint-enable @typescript-eslint/consistent-type-definitions */
}

export const configService = fp(async (fastify) => {
  fastify.decorate("config", config);
});
