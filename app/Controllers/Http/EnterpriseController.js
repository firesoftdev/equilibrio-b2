"use strict";

const Enterprise = use("App/Models/Enterprise");

class EnterpriseController {
  async index({ auth }) {
    const enterprises = await Enterprise.query()
      .where("user_id", "=", auth.user.id)
      .fetch();

    return enterprises;
  }

  async store({ request, auth }) {
    const user_id = auth.user.id;
    const { entrepreneur_id, name, local, field } = request.all();

    const enterprise = await Enterprise.create({
      user_id,
      entrepreneur_id,
      name,
      local,
      field
    });

    return enterprise;
  }

  async show({ params }) {
    const enterprise = await Enterprise.findOrFail(params.id);

    await enterprise.load("entrepreneur");
    await enterprise.load("processes");

    return enterprise;
  }

  async update({ params, request }) {
    const enterprise = await Enterprise.findOrFail(params.id);

    const data = request.only(["name", "local", "field", "entrepreneur_id"]);

    enterprise.merge(data);

    await enterprise.save();

    return enterprise;
  }

  async destroy({ params, request, response }) {
    const enterprise = await Enterprise.findOrFail(params.id);

    await enterprise.delete();

    return true;
  }
}

module.exports = EnterpriseController;
