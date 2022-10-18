import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("organizations", (t) => {
    t.uuid("id").primary();
    t.timestamps();

    t.string("name").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("organizations");
}
