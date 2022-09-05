import { z } from "zod";
import { createRouter } from "../../services/trpc";
import { OrganizationModel, outputSchema } from "./model";

export const organizationsRouter = createRouter().query("read", {
  input: z.void(),
  output: z.array(outputSchema),
  async resolve() {
    const organizations = await OrganizationModel.query().select();
    return organizations;
  },
});
