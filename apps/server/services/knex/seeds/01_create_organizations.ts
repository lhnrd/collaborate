import { Knex } from "knex";
import { Model } from "objection";
import { organizationFactory } from "../factories";

export async function seed(knex: Knex): Promise<void> {
  Model.knex(knex);

  await knex("organizations").del();

  await organizationFactory.create();
}
