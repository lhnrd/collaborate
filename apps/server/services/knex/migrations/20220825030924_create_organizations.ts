import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("organizations", (t) => {
    t.uuid("id").primary().notNullable();
    t.string("name").notNullable().unique();
    t.timestamps();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("organizations");
}
