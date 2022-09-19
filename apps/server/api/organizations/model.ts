import { Type } from "@sinclair/typebox";
import { BaseModel } from "../model";

export class OrganizationModel extends BaseModel {
  static tableName = "organizations";

  static get jsonSchema() {
    return Type.Intersect(
      [
        super.jsonSchema,
        Type.Object({
          name: Type.String(),
        }),
      ],
      { $id: "OrganizationInput" }
    );
  }

  static get outputSchema() {
    return Type.Intersect(
      [
        super.outputSchema,
        Type.Object({
          name: Type.String(),
        }),
      ],
      { $id: "OrganizationModel" }
    );
  }

  name!: string;
}
