import { app } from "./app";

async function start() {
  const server = await app({
    logger: {
      transport: {
        target: "pino-pretty",
        options: {
          translateTime: "HH:MM:ss Z",
          ignore: "pid,hostname",
        },
      },
    },
  });

  const { host, port } = server.config.get("HTTPServer");

  try {
    await server.listen({ port, host });
  } catch (error: unknown) {
    server.log.error(error);
    process.exit(1);
  }

  return server;
}

void start();
