const { createPaginationData } = require("../helpers/utils");
const Models = require("../models/index");

module.exports.createPublisher = async (req, res) => {
  try {
    const publisher = await Models.Publisher.create({ ...req.body });
    return publisher?.dataValues;
  } catch (err) {
    console.log("An error occurred creating publisher: controller", err);
  }
};

module.exports.editPublisher = async (req, res) => {
  try {
    const publisher = await Models.Publisher.findOne({
      where: { id: req.params.id },
    });

    publisher.set({ ...req.body });
    await publisher.save();
    return publisher?.dataValues;
  } catch (err) {
    console.log("An error occurred editing publisher: controller", err);
  }
};

module.exports.getPublisher = async (req, res) => {
  try {
    const publisher = await Models.Publisher.findOne({
      where: { id: req.params.id },
    });
    return publisher.dataValues;
  } catch (err) {
    console.log("An error occurred fetching publisher: controller", err);
  }
};

module.exports.getPublishers = async (req, res) => {
  const page = parseInt(req.query?.page || 1);
  const limit = parseInt(req.query?.limit || 25);
  const offset = page > 1 ? (page - 1) * limit : 0;

  const publishers = await Models.Publisher.findAll({
    raw: true,
    limit,
    offset,
  });

  const publisherCount = await Models.Publisher.count();

  const paginationData = createPaginationData(req, page, limit, publisherCount);

  return {
    results: publishers,
    count: publisherCount,
    ...paginationData,
  };
};

module.exports.deletePublisher = async (req, res) => {
  try {
    await Models.Publisher.destroy({
      where: { id: req.params.id },
    });
  } catch (err) {
    console.log("An error occurred when deleting publisher: controller:", err);
  }
};
