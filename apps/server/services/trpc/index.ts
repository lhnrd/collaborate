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

type CreateContextOptions = Record<string, unknown>;

/**
 * Inner function for `createContext` where we create the context.
 * This is useful for testing when we don't want to mock Next.js' request/response
 */
export function createContextInner(_opts?: CreateContextOptions) {
  return {};
}

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export function createContext({ req, res }: CreateFastifyContextOptions) {
  const ctx = createContextInner();
  return { ...ctx, req, res };
}

export type Context = inferAsyncReturnType<typeof createContextInner>;

export function createRouter() {
  return router<Context>();
}
