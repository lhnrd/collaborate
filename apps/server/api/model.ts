import { Type } from "@sinclair/typebox";
import Objection, { Model, snakeCaseMappers } from "objection";
import { v4 as uuidv4 } from "uuid";

export class BaseModel extends Model {
  static columnNameMappers = snakeCaseMappers();

  static get jsonSchema() {
    return Type.Object({
      id: Type.Optional(Type.String()),
      createdAt: Type.Optional(Type.String()),
      updatedAt: Type.Optional(Type.String()),
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
