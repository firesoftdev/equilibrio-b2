"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class EntrepreneurSchema extends Schema {
  up() {
    this.create("entrepreneurs", table => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("name").notNullable();
      table.string("cnpj");
      table.timestamps();
    });
  }

  down() {
    this.drop("entrepreneurs");
  }
}

module.exports = EntrepreneurSchema;
