const Planning = require("../models");

const { OK, NotFound } = require("../../constants");

module.exports = {
  createOne: async (req, res) => {},

  getAll: (req, res) =>
    Planning.find()
      .then((plannings) => res.status(OK.code).send(plannings))
      .catch((err) =>
        res.status(NotFound.code).send(err.message || NotFound.message),
      ),

  getOne: (req, res) => {},

  // TODO - Add Update Logic, include Redis update
  updateOne: (req, res) => {},

  deleteOne: (req, res) => {},
};
