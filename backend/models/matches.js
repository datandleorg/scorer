const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const matchSchema = new Schema(
  {
    overs: {
      type: Number,
      required: true,
    },
    tossWonBy: {
      type: String,
      required: true,
    },
    battingFirst: {
      type: String,
      required: true,
    },
    team1: {
      type: Schema.Types.ObjectId,
      ref: "Team",
    },
    team2: {
      type: Schema.Types.ObjectId,
      ref: "Team",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    scorecard: {
      type: Schema.Types.ObjectId,
      ref: "Scorecard",
    },
  },
  { strict: false }
);
module.exports = mongoose.model("Match", matchSchema);
