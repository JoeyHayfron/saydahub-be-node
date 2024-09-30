const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/authentication");
const {
  createPublisher,
  getPublisher,
  getPublishers,
  editPublisher,
  deletePublisher,
} = require("../controllers/publisher");

router.post("/", isAuthenticated, async (req, res, next) => {
  try {
    const newPublisher = await createPublisher(req, res);
    res.status(201).send({
      message: "Publisher created successfully",
      data: { ...newPublisher },
    });
  } catch (err) {
    res.status(500).send({
      message: "An error occurred creating publisher",
    });
  }
});

router.get("/:id", isAuthenticated, async (req, res, next) => {
  try {
    const publisher = await getPublisher(req, res);
    res.status(200).send({
      data: { ...publisher },
    });
  } catch (err) {
    res.status(500).send({
      message: "An error occurred fetching publisher",
    });
  }
});

router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const publishers = await getPublishers(req, res);
    res.status(200).send({
      data: { ...publishers },
    });
  } catch (err) {
    res.status(500).send({
      message: "An error occurred fetching publishers",
    });
  }
});

router.patch("/:id", isAuthenticated, async (req, res, next) => {
  try {
    const publisher = await editPublisher(req, res);
    res.status(200).send({
      message: "Publisher info edited successfully",
      data: { ...publisher },
    });
  } catch (err) {
    res.status(500).send({
      message: "An error occurred editing publisher",
    });
  }
});

router.delete("/:id", isAuthenticated, async (req, res, next) => {
  try {
    await deletePublisher(req, res);
    res.status(200).send({
      message: "Publisher deleted successfully",
    });
  } catch (err) {
    res.status(500).send({
      message: "An error occurred deleting publisher",
    });
  }
});

module.exports.publisherRouter = router;
