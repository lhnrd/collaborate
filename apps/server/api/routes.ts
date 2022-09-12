import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { organizationsRoutes } from "./organizations/routes";

export const baseRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  await fastify.register(organizationsRoutes);
};
