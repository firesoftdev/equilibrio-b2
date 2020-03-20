"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class EnterpriseSchema extends Schema {
  up() {
    this.create("enterprises", table => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("entrepreneur_id")
        .unsigned()
        .references("id")
        .inTable("entrepreneurs")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("name").notNullable();
      table.string("field");
      table.string("local");
      table.timestamps();
    });
  }

  down() {
    this.drop("enterprises");
  }
}

module.exports = EnterpriseSchema;
