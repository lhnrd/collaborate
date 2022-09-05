import Objection, { Model, snakeCaseMappers } from "objection";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { ZodValidator } from "../utils/zod-validator";

export class BaseModel extends Model {
  static columnNameMappers = snakeCaseMappers();

  static createValidator() {
    return new ZodValidator();
  }

  static validationSchema() {
    return z.object({
      id: z.string().optional(),
      createdAt: z.string().optional(),
      updatedAt: z.string().optional(),
    });
  }

  id!: string;
  createdAt!: string;
  updatedAt?: string;

  async $beforeInsert(queryContext: Objection.QueryContext) {
    await super.$beforeInsert(queryContext);

    this.id = this.id || uuidv4();
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
