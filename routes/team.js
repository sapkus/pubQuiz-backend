const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const teamControler = require("../controler/team");
const Team = require("../models/team");


router.get("/administration", teamControler.getTeams);
// router.post("/administration");

router.post(
  "/registration",
  [
    body("name").trim().isLength({ min: 5 }),
    //   .custom((value) => {
    //     return Team.find({ name: value }).then((team) => {
    //       if (team) {
    //         return Promise.reject("This name is already taken");
    //       }
    //     });
    //   }),
    body("captain").trim().isLength({ min: 5 }),
    body("email").isEmail(),
    //   .custom((value) => {
    //     return Team.find({ email: value }).then((team) => {
    //       if (team) {
    //         return Promise.reject("E-mail already in use");
    //       }
    //     });
    //   }),
  ],
  teamControler.registration
);

router.get("/positionsTaken", teamControler.getTakenPositions);

// router.post("/administration");


// router.post("/live");

module.exports = router;
