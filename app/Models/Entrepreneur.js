"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Entrepreneur extends Model {
  user() {
    return this.belongsTo("App/Models/User");
  }

  enterprises() {
    return this.hasMany("App/Models/Enterprise");
  }

  processes() {
    return this.hasMany("App/Models/Process");
  }

  tasks() {
    return this.hasMany("App/Models/Task");
  }
}

module.exports = Entrepreneur;
