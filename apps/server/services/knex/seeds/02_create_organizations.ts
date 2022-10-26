import { Knex } from "knex";
import { Model } from "objection";
import { organizationFactory } from "../factories";

export async function seed(knex: Knex): Promise<void> {
  Model.knex(knex);

  await knex("organizations").del();
  await knex("contact_mechanisms_addresses").del();
  await knex("contact_mechanisms_phones").del();
  await knex("contact_mechanisms_emails").del();
  await knex("contact_mechanisms").del();

  await organizationFactory.createList(10);
}
