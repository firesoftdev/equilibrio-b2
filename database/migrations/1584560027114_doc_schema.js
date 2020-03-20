"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class DocSchema extends Schema {
  up() {
    this.create("docs", table => {
      table.increments();
      table
        .integer("process_id")
        .unsigned()
        .references("id")
        .inTable("processes")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("description").notNullable();
      table.string("key").notNullable();
      table.string("url").notNullable();
      table.string("content_type").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("docs");
  }
}

module.exports = DocSchema;
