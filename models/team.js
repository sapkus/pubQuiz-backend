const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const teamSchema = Schema({
  name: {type: String},
  captain: {type: String},
  email: {type: String},
  approved: { type: Boolean, default: false} ,
  round1: { type: Number, default: 0 },
  round2: { type: Number, default: 0 },
  round3: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
});

module.exports = mongoose.model("Team", teamSchema);
