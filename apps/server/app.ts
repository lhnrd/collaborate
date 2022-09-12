import sensible from "@fastify/sensible";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import Fastify from "fastify";
import { baseRoutes } from "./api/routes";
import { configService } from "./services/config";
import { knexService } from "./services/knex";
import { swaggerService } from "./services/swagger";

type FastifyOptions = Parameters<typeof Fastify>[0];

export async function app(options?: FastifyOptions) {
  const fastify = Fastify(options).withTypeProvider<TypeBoxTypeProvider>();

  // Ecosystem Plugins
  await fastify.register(sensible);
  await fastify.register(swaggerService);

  // Custom Plugins
  await fastify.register(configService);
  await fastify.register(knexService);
  await fastify.register(baseRoutes, { prefix: "/api" });

  await fastify.ready();

  fastify.swagger();

  return fastify;
}
