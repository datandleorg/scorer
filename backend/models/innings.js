const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const inningSchema = new Schema({
  striker: {
    type: String,
  },
  nonstriker: {
    type: String,
  },
  runs: {
    type: Number,
  },
  wickets: {
    type: Number,
  },
  bowler1: {
    type: String,
  },
  bowler2: {
    type: String,
  },
  currentover: {
    type: Number,
  },
  currentball: {
    type: Number,
  },
  balls: {
    type: Number,
  },
  target: {
    type: Number,
  },
  end: {
    type: Boolean,
  },
});
const scorecardSchema = new Schema(
  {
    innings1: {
      type: inningSchema,
    },
    innings2: {
      type: inningSchema,
    },
  },
  { strict: false }
);
module.exports = mongoose.model("Innings", inningSchema);
module.exports = mongoose.model("Scorecard", scorecardSchema);
