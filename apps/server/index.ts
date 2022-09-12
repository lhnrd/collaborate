import { app } from "./app";
import { env, host, port } from "./config";

async function start() {
  const server = await app({
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

  try {
    await server.listen({ port: Number(port), host });
  } catch (error: unknown) {
    server.log.error(error);
    process.exit(1);
  }

  return server;
}

start().then(
  () => {
    console.log("started");
  },
  (...args) => {
    console.log("failed", ...args);
  }
);
