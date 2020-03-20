"use strict";

const Process = use("App/Models/Process");

class ProcessController {
  async index({ auth }) {
    const processes = await Process.query()
      .where("user_id", "=", auth.user.id)
      .fetch();

    return processes;
  }

  async store({ request, auth }) {
    const user_id = auth.user.id;
    const { entrepreneur_id, enterprise_id, type, deadline } = request.all();

    const process = Process.create({
      user_id,
      entrepreneur_id,
      enterprise_id,
      type,
      deadline
    });

    return process;
  }

  async show({ params }) {
    const process = await Process.findOrFail(params.id);

    await process.loadMany(["entrepreneur", "enterprise", "docs"]);

    return process;
  }

  async update({ params, request }) {
    const process = await Process.findOrFail(params.id);

    const { deadline, extended = false, completed = false } = request.all();

    process.merge({ deadline, extended, completed });

    process.save();

    return process;
  }

  async destroy({ params }) {
    const process = await Process.findOrFail(params.id);

    await process.delete();

    return true;
  }
}

module.exports = ProcessController;
