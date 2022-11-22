import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@sinclair/typebox";
import { IntersectAllOf } from "../../utils/intersect-all-of";
import { OrganizationModel } from "./model";

export const organizationsRoutes: FastifyPluginAsyncTypebox = async (
  fastify
) => {
  fastify.addSchema(OrganizationModel.jsonSchema);
  fastify.addSchema(OrganizationModel.outputSchema);

  /**
   * The shorthand route methods (i.e. .get) accept a generic object RouteGenericInterface
   * containing five named properties: Body, Querystring, Params, Headers and Reply.
   * The interfaces Body, Querystring, Params and Headers will be passed down through
   * the route method into the route method handler request instance and the Reply interface to the reply instance.
   */
  fastify.route({
    method: "GET",
    url: "/organizations",
    schema: {
      description: "Returns a list of organizations or an empty list",
      summary: "Retrieve all organizations",
      tags: ["organization"],
      response: {
        200: Type.Array(
          IntersectAllOf([
            Type.Ref(OrganizationModel.outputSchema),
            Type.Object({
              testing: Type.String(),
            }),
          ])
        ),
      },
    },
    /**
     * If you want to use async/await or promises but respond with a value with reply.send:
     * - Do return reply / await reply.
     * - Do not forget to call reply.send.
     * If you want to use async/await or promises:
     * - Do not use reply.send.
     * - Do return the value that you want to send.
     *
     * @see https://www.fastify.io/docs/latest/Reference/Routes/#promise-resolution
     */
    async handler(_request, _reply) {
      const organizations = await OrganizationModel.query().select();
      return organizations;
    },
  });
};
