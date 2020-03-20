"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Task extends Model {
  user() {
    return this.belongsTo("App/Models/User");
  }

  entrepreneur() {
    return this.belongsTo("App/Models/Entrepreneur");
  }

  enterprise() {
    return this.belongsTo("App/Models/Enterprise");
  }

  process() {
    return this.belongsTo("App/Models/Process");
  }
}

module.exports = Task;
