const Team = require("../models/team");
const { validationResult } = require("express-validator");

exports.getStatus = (req, res, next) => {};

exports.registration = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    throw error;
  }

  const name = req.body.name;
  const email = req.body.name;
  const captain = req.body.captain;

  const team = new Team({
    name: name,
    email: email,
    captain: captain,
  });
  team
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Team registered",
        team: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getTeams = (req, res, next) => {
  Team.find()
    .then((teams) => {
      if (!teams) {
        const error = new Error("No teams found");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: "All teams fetched", teams: teams });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getTakenPositions = async (req, res, next) => {
  try {
    const count = await Team.countDocuments({ approved: true });
    console.log(count);
    res.status(200).json({ message: "Count success", count: count });
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};

// router.get("/status");

// router.post("/registration");

// router.post("/administration");

// router.post("/live");
