import { Type } from "@sinclair/typebox";
import { Model } from "objection";
import {
  AddressModel,
  ContactMechanismModel,
  EmailModel,
  PhoneModel,
} from "../contact-mechanisms/model";
import { TimestampedModel } from "../model";

export class OrganizationModel extends TimestampedModel {
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

  static get relationMappings() {
    return {
      addresses: {
        relation: Model.ManyToManyRelation,
        modelClass: AddressModel,
        join: {
          from: "organizations.id",
          through: {
            modelClass: ContactMechanismModel,
            from: "contact_mechanisms.organization_id",
            to: "contact_mechanisms.contact_mechanism_address_id",
          },
          to: "contact_mechanisms_addresses.id",
        },
      },
      emails: {
        relation: Model.ManyToManyRelation,
        modelClass: EmailModel,
        join: {
          from: "organizations.id",
          through: {
            modelClass: ContactMechanismModel,
            from: "contact_mechanisms.organization_id",
            to: "contact_mechanisms.contact_mechanism_email_id",
          },
          to: "contact_mechanisms_emails.id",
        },
      },
      phones: {
        relation: Model.ManyToManyRelation,
        modelClass: PhoneModel,
        join: {
          from: "organizations.id",
          through: {
            modelClass: ContactMechanismModel,
            from: "contact_mechanisms.organization_id",
            to: "contact_mechanisms.contact_mechanism_phone_id",
          },
          to: "contact_mechanisms_phones.id",
        },
      },
    };
  }

  name!: string;

  addresses?: AddressModel[];
  emails?: EmailModel[];
  phones?: PhoneModel[];
}
