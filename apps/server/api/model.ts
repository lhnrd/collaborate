import Objection, { compose, Model, snakeCaseMappers } from "objection";
import objectionGuid from "objection-guid";
import { ZodValidator } from "../utils/zod-validator";

const enhanced = compose(objectionGuid());

export class BaseModel extends enhanced(Model) {
  static columnNameMappers = snakeCaseMappers();

  static schema() {
    throw new Error("schema not implemented");
  }

  static createValidator() {
    return new ZodValidator();
  }

  id!: string;
  createdAt!: string;
  updatedAt?: string;

  async $beforeInsert(queryContext: Objection.QueryContext) {
    await super.$beforeInsert(queryContext);

    this.createdAt = new Date().toISOString();
  }

  async $beforeUpdate(
    opt: Objection.ModelOptions,
    queryContext: Objection.QueryContext
  ) {
    await super.$beforeUpdate(opt, queryContext);

    this.updatedAt = new Date().toISOString();
  }
}
