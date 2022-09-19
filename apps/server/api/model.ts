import { Type } from "@sinclair/typebox";
import addFormats from "ajv-formats";
import Objection, { AjvValidator, Model, snakeCaseMappers } from "objection";
import { v4 as uuidv4 } from "uuid";

export class BaseModel extends Model {
  static columnNameMappers = snakeCaseMappers();

  static createValidator() {
    return new AjvValidator({
      onCreateAjv(ajv) {
        addFormats(ajv, [
          "date-time",
          "time",
          "date",
          "email",
          "hostname",
          "ipv4",
          "ipv6",
          "uri",
          "uri-reference",
          "uuid",
          "uri-template",
          "json-pointer",
          "relative-json-pointer",
          "regex",
        ]);
      },
      options: {
        allErrors: true,
        validateSchema: false,
        ownProperties: true,
      },
    });
  }

  static get jsonSchema() {
    return Type.Object(
      {
        id: Type.Optional(Type.String({ format: "uuid" })),
        createdAt: Type.Optional(Type.String({ format: "date-time" })),
        updatedAt: Type.Optional(
          Type.Union([Type.String({ format: "date-time" }), Type.Null()])
        ),
      },
      { $id: "BaseInput" }
    );
  }

  static get outputSchema() {
    return Type.Object(
      {
        id: Type.String({ format: "uuid" }),
        createdAt: Type.String({ format: "date-time" }),
        updatedAt: Type.Union([
          Type.String({ format: "date-time" }),
          Type.Null(),
        ]),
      },
      { $id: "BaseModel" }
    );
  }

  id!: string;
  createdAt!: string;
  updatedAt!: string | null;

  async $beforeInsert(queryContext: Objection.QueryContext) {
    await super.$beforeInsert(queryContext);

    this.id = this.id || uuidv4();
    this.createdAt = new Date().toISOString();
    this.updatedAt = null;
  }

  async $beforeUpdate(
    opt: Objection.ModelOptions,
    queryContext: Objection.QueryContext
  ) {
    await super.$beforeUpdate(opt, queryContext);

    this.updatedAt = new Date().toISOString();
  }

  $parseDatabaseJson(json: Objection.Pojo): Objection.Pojo {
    json = super.$parseDatabaseJson(json);

    return Object.entries(json).reduce((acc, [key, value]) => {
      if (value instanceof Date) {
        Reflect.set(acc, key, value.toISOString());
        return acc;
      }

      Reflect.set(acc, key, value);
      return acc;
    }, {});
  }
}
