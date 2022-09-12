import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@sinclair/typebox";
import { OrganizationModel } from "./model";
import { OrganizationSchema } from "./schemas";

export const organizationsRoutes: FastifyPluginAsyncTypebox = async (
  fastify
) => {
  fastify.addSchema(OrganizationSchema);
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
        200: Type.Array(Type.Ref(OrganizationSchema)),
      },
    },
    async handler(_, reply) {
      const orgs = await OrganizationModel.query().select();
      return reply.send(orgs);
    },
  });
};
