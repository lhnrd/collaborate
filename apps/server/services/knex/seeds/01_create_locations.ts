import { getCities, getStates } from "@brazilian-utils/brazilian-utils";
import { StateCode } from "@brazilian-utils/brazilian-utils/dist/common/states";
import { Knex } from "knex";
import { Model } from "objection";
import {
  CityModel,
  CountryModel,
  StateModel,
} from "../../../api/contact-mechanisms/model";

export async function seed(knex: Knex): Promise<void> {
  Model.knex(knex);

  await knex("cities").del();
  await knex("states").del();
  await knex("countries").del();

  const country = await CountryModel.query()
    .insert({
      code: "BR",
      name: "Brazil",
    })
    .returning("*");

  const states = await StateModel.query()
    .insertGraph(
      getStates().map((state) => ({
        code: state.code,
        name: state.name,
        country: {
          id: country.id,
        },
      })),
      { relate: true }
    )
    .returning("*");

  await CityModel.query()
    .insertGraph(
      states.flatMap((state) =>
        getCities(state.code as StateCode).map((city) => ({
          name: city,

          state: {
            id: state.id,
          },
        }))
      ),
      { relate: true }
    )
    .returning("*");
}
