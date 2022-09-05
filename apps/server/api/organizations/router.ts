import { z } from "zod";
import { createRouter } from "../../services/trpc";
import { OrganizationModel } from "./model";

export const organizationsRouter = createRouter().query("read", {
  input: z.void(),
  output: z.array(
    z.object({
      id: z.string(),
      createdAt: z.string(),
      updatedAt: z.string().optional(),
      name: z.string(),
    })
  ),
  async resolve() {
    const organizations = await OrganizationModel.query().select();
    return organizations;
  },
});
