import { z } from "zod";
import { BaseModel } from "../model";

export class OrganizationModel extends BaseModel {
  static tableName = "organizations";

  static validationSchema() {
    return super.validationSchema().extend({
      name: z.string(),
    });
  }

  name!: string;
}
