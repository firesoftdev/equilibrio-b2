"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Enterprise extends Model {
  user() {
    return this.belongsTo("App/Models/User");
  }

  entrepreneur() {
    return this.belongsTo("App/Models/Entrepreneur");
  }

  processes() {
    return this.hasMany("App/Models/Process");
  }

  tasks() {
    return this.hasMany("App/Models/Task");
  }
}

module.exports = Enterprise;
