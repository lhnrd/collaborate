import { AnyRouter, router } from "@trpc/server";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import fp from "fastify-plugin";

import { inferAsyncReturnType } from "@trpc/server";
import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";

export function trpcService(baseRouter: AnyRouter) {
  return fp(async (fastify) => {
    await fastify.register(fastifyTRPCPlugin, {
      prefix: "/trpc",
      trpcOptions: { router: baseRouter, createContext },
    });
  });
}

export function createContext({ req, res }: CreateFastifyContextOptions) {
  const user = { name: req.headers.username ?? "anonymous" };
  return { req, res, user };
}

export type Context = inferAsyncReturnType<typeof createContext>;

export function createRouter() {
  return router<Context>();
}
