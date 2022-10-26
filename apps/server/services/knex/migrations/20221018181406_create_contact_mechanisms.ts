import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("countries", (t) => {
    t.uuid("id").primary();
    t.string("code").notNullable().unique();
    t.string("name").notNullable().unique();
  });

  await knex.schema.createTable("states", (t) => {
    t.uuid("id").primary();
    t.string("code").notNullable().unique();
    t.string("name").notNullable().unique();

    t.uuid("country_id")
      .notNullable()
      .references("countries.id")
      .onDelete("CASCADE");
  });

  await knex.schema.createTable("cities", (t) => {
    t.uuid("id").primary();
    t.string("name");

    t.uuid("state_id")
      .notNullable()
      .references("states.id")
      .onDelete("CASCADE");
  });

  await knex.schema.createTable("contact_mechanisms_addresses", (t) => {
    t.uuid("id").primary();
    t.timestamps();

    t.string("street");
    t.string("street_number");
    t.string("zip_code");
    t.string("complement");
    t.string("additional_info");
    t.string("district");

    t.uuid("city_id").references("cities.id").onDelete("SET NULL");
  });

  await knex.schema.createTable("contact_mechanisms_emails", (t) => {
    t.uuid("id").primary();
    t.timestamps();

    t.string("address");
  });

  await knex.schema.createTable("contact_mechanisms_phones", (t) => {
    t.uuid("id").primary();
    t.timestamps();

    t.string("country_code");
    t.string("area_code");
    t.string("number");
  });

  await knex.schema.createTable("contact_mechanisms", (t) => {
    t.uuid("id").primary();

    // polymorphic associations with resources
    t.uuid("user_id").references("users.id").onDelete("CASCADE");
    t.uuid("organization_id")
      .references("organizations.id")
      .onDelete("CASCADE");

    t.check(`
      (user_id is not null and organization_id is null)
      or
      (user_id is null and organization_id is not null)
    `);

    // polymorphic associations with types of contact mechanisms
    t.uuid("contact_mechanism_address_id")
      .references("contact_mechanisms_addresses.id")
      .onDelete("CASCADE");

    t.uuid("contact_mechanism_email_id")
      .references("contact_mechanisms_emails.id")
      .onDelete("CASCADE");

    t.uuid("contact_mechanism_phone_id")
      .references("contact_mechanisms_phones.id")
      .onDelete("CASCADE");

    t.check(`
      (contact_mechanism_address_id is not null and contact_mechanism_email_id is null and contact_mechanism_phone_id is null)
      or
      (contact_mechanism_address_id is null and contact_mechanism_email_id is not null and contact_mechanism_phone_id is null)
      or
      (contact_mechanism_address_id is null and contact_mechanism_email_id is null and contact_mechanism_phone_id is not null)
    `);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("contact_mechanisms");
  await knex.schema.dropTable("contact_mechanisms_addresses");
  await knex.schema.dropTable("cities");
  await knex.schema.dropTable("states");
  await knex.schema.dropTable("countries");
  await knex.schema.dropTable("contact_mechanisms_emails");
  await knex.schema.dropTable("contact_mechanisms_phones");
}
