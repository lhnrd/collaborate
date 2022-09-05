import sensible from "@fastify/sensible";
import fp from "fastify-plugin";

export function fastifyService() {
  return fp(async (fastify, _opts) => {
    await fastify.register(sensible);
  });
}
