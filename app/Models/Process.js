"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Process extends Model {
  user() {
    return this.belongsTo("App/Models/User");
  }

  entrepreneur() {
    return this.belongsTo("App/Models/Entrepreneur");
  }

  enterprise() {
    return this.belongsTo("App/Models/Enterprise");
  }

  tasks() {
    return this.hasMany("App/Models/Task");
  }

  docs() {
    return this.hasMany("App/Models/Doc");
  }
}

module.exports = Process;
