import swagger from "@fastify/swagger";
import fp from "fastify-plugin";

export const swaggerService = fp(async (fastify) => {
  await fastify.register(swagger, {
    routePrefix: "/docs",
    openapi: {
      info: {
        title: "Collaborate API",
        description: `API that provides information about non-governmental organizations.
          Both information about the NGO and information about collaboration opportunities for them.`,
        version: "0.0.1",
      },
      tags: [
        {
          name: "organization",
          description: "Everything about non-governamental organizations",
          externalDocs: {
            description: "Find out more",
            url: "http://swagger.io",
          },
        },
      ],
    },
    exposeRoute: true,
    refResolver: {
      buildLocalReference(json, _base, _fragment, _index) {
        return String(json.$id);
      },
    },
  });
});
