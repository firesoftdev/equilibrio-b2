"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ProcessSchema extends Schema {
  up() {
    this.create("processes", table => {
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
      table
        .integer("enterprise_id")
        .unsigned()
        .references("id")
        .inTable("enterprises")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("type").notNullable();
      table.date("deadline");
      table.boolean("extended").defaultTo(false);
      table.boolean("completed").defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop("processes");
  }
}

module.exports = ProcessSchema;
