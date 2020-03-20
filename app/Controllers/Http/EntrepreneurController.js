"use strict";

const Entrepreneur = use("App/Models/Entrepreneur");

class EntrepreneurController {
  async index({ auth }) {
    const entrepreneurs = await Entrepreneur.query()
      .where("user_id", "=", auth.user.id)
      .fetch();

    return entrepreneurs;
  }

  async store({ request, auth }) {
    const user_id = auth.user.id;
    const { name, cnpj } = request.all();

    const entrepreneur = await Entrepreneur.create({ user_id, name, cnpj });

    return entrepreneur;
  }

  async show({ params }) {
    const entrepreneur = await Entrepreneur.findOrFail(params.id);

    await entrepreneur.load("enterprises");
    await entrepreneur.load("processes");

    return entrepreneur;
  }

  async update({ params, request }) {
    const entrepreneur = await Entrepreneur.findOrFail(params.id);

    const data = request.only(["name", "cnpj"]);

    entrepreneur.merge(data);

    await entrepreneur.save();

    return entrepreneur;
  }

  async destroy({ params }) {
    const entrepreneur = await Entrepreneur.findOrFail(params.id);

    await entrepreneur.delete();

    return true;
  }
}

module.exports = EntrepreneurController;
