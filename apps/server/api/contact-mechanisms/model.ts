import { Model } from "objection";
import { BaseModel, TimestampedModel } from "../model";

export class CountryModel extends BaseModel {
  static tableName = "countries";

  code!: string;
  name!: string;
}

export class StateModel extends BaseModel {
  static tableName = "states";

  static relationMappings = {
    country: {
      relation: Model.BelongsToOneRelation,
      modelClass: CountryModel,
      join: {
        from: "states.country_id",
        to: "countries.id",
      },
    },
  };

  code!: string;
  name!: string;
  country!: CountryModel;
}

export class CityModel extends BaseModel {
  static tableName = "cities";

  static relationMappings = {
    state: {
      relation: Model.BelongsToOneRelation,
      modelClass: StateModel,
      join: {
        from: "cities.state_id",
        to: "states.id",
      },
    },
  };

  name!: string;
  state!: StateModel;
}

export class AddressModel extends TimestampedModel {
  static tableName = "contact_mechanisms_addresses";

  static relationMappings = {
    city: {
      relation: Model.BelongsToOneRelation,
      modelClass: CityModel,
      join: {
        from: "contact_mechanisms_addresses.city_id",
        to: "cities.id",
      },
    },
  };
}

export class PhoneModel extends TimestampedModel {
  static tableName = "contact_mechanisms_phones";
}

export class EmailModel extends TimestampedModel {
  static tableName = "contact_mechanisms_emails";
}
