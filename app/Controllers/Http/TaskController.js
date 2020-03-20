"use strict";

const Task = use("App/Models/Task");

class TaskController {
  async index({ auth }) {
    const tasks = await Task.query()
      .where("user_id", "=", auth.user.id)
      .fetch();

    return tasks;
  }

  async store({ request }) {
    const user_id = auth.user.id;
    const {
      entrepreneur_id,
      enterprise_id,
      process_id,
      title,
      description,
      deadline
    } = request.all();

    const task = Task.create({
      user_id,
      entrepreneur_id,
      enterprise_id,
      process_id,
      title,
      description,
      deadline
    });

    return task;
  }

  async show({ params }) {
    const task = await Task.findOrFail(params.id);

    await task.loadMany(["entrepreneur", "enterprise", "process"]);

    return task;
  }

  async update({ params, request }) {
    const task = await Task.findOrFail(params.id);

    const {
      title,
      description,
      deadline,
      extended = false,
      completed = false
    } = request.all();

    process.merge({ title, description, deadline, extended, completed });

    process.save();

    return process;
  }

  async destroy({ params }) {
    const task = await Task.findOrFail(params.id);

    await task.delete();

    return true;
  }
}

module.exports = TaskController;
