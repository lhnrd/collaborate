import { z } from "zod";
import { BaseModel } from "../model";

export class OrganizationModel extends BaseModel {
  static tableName = "organizations";

  static schema() {
    return inputSchema;
  }

  name!: string;
}

export const inputSchema = z.object({
  id: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  name: z.string(),
});

export const outputSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
  name: z.string(),
});
