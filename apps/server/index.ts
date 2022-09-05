import Fastify from "fastify";
import { baseRouter } from "./api/router";
import { env, host, port } from "./config";
import { fastifyService } from "./services/fastify";
import { knexService } from "./services/knex";
import { trpcService } from "./services/trpc";

async function start() {
  const fastify = Fastify({
    logger: {
      transport:
        env === "development"
          ? {
              target: "pino-pretty",
              options: {
                translateTime: "HH:MM:ss Z",
                ignore: "pid,hostname",
              },
            }
          : undefined,
    },
  });

  await fastify.register(fastifyService());
  await fastify.register(knexService());
  await fastify.register(trpcService(baseRouter));

  try {
    await fastify.listen({ port: Number(port), host });
  } catch (error: unknown) {
    fastify.log.error(error);
    process.exit(1);
  }

  return fastify;
}

start().then(
  () => {
    console.log("started");
  },
  (...args) => {
    console.log("failed", ...args);
  }
);
