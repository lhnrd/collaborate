import { Validator, ValidatorArgs } from "objection";
import { BaseModel } from "../api/model";

export class ZodValidator extends Validator {
  validate({ model, json }: ValidatorArgs) {
    if (!(model instanceof BaseModel)) {
      throw new Error(
        "Model should extend BaseModel and implement the schema property."
      );
    }

    const modelClass = model.$modelClass;
    const modelSchema = modelClass.schema();

    modelSchema.parse(json);

    return json;
  }
}
