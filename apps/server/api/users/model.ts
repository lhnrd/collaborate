import { Type } from "@sinclair/typebox";
import { Model } from "objection";
import {
  AddressModel,
  EmailModel,
  PhoneModel,
} from "../contact-mechanisms/model";
import { TimestampedModel } from "../model";

export class UserModel extends TimestampedModel {
  static tableName = "users";

  static get jsonSchema() {
    return Type.Intersect(
      [
        super.jsonSchema,
        Type.Object({
          email: Type.String(),
          name: Type.Optional(Type.String()),
          lastName: Type.Optional(Type.String()),
        }),
      ],
      { $id: "UserInput" }
    );
  }

  static get outputSchema() {
    return Type.Intersect(
      [
        super.outputSchema,
        Type.Object({
          email: Type.String(),
          name: Type.Optional(Type.String()),
          lastName: Type.Optional(Type.String()),
        }),
      ],
      { $id: "UserModel" }
    );
  }

  static relationMappings = {
    addresses: {
      relation: Model.ManyToManyRelation,
      modelClass: AddressModel,
      join: {
        from: "users.id",
        through: {
          from: "contact_mechanisms.user_id",
          to: "contact_mechanisms.id",
        },
        to: "contact_mechanisms_addresses.contact_mechanism_id",
      },
    },
    emails: {
      relation: Model.ManyToManyRelation,
      modelClass: EmailModel,
      join: {
        from: "users.id",
        through: {
          from: "contact_mechanisms.user_id",
          to: "contact_mechanisms.id",
        },
        to: "contact_mechanisms_emails.contact_mechanism_id",
      },
    },
    phones: {
      relation: Model.ManyToManyRelation,
      modelClass: PhoneModel,
      join: {
        from: "users.id",
        through: {
          from: "contact_mechanisms.user_id",
          to: "contact_mechanisms.id",
        },
        to: "contact_mechanisms_phones.contact_mechanism_id",
      },
    },
  };

  email!: string;
  name?: string;
  lastName?: string;

  addresses?: AddressModel[];
  emails?: EmailModel[];
  phones?: PhoneModel[];
}
