const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ballsSchema = new Schema({
  type:{
    type: String,
  },
  value:{
    type: Number
  }
});

const inningSchema = new Schema({
  striker: {
    type: Schema.Types.ObjectId,
    ref:'Player'
  },
  non_striker: {
    type: Schema.Types.ObjectId,
    ref:'Player'
  },
  runs: {
    type: Number,
  },
  wickets: {
    type: Number,
  },
  bowler_1: {
    type: Schema.Types.ObjectId,
    ref:'Player'
  },
  bowler_2: {
    type: String,
  },
  current_over: {
    type: Number,
  },
  current_ball: {
    type: Number,
  },
  balls: [{
    type:ballsSchema,
  }
  ],
  target: {
    type: Number,
  },
  end: {
    type: Boolean,
  },
});
const scorecardSchema = new Schema(
  {
    matchStatus:{
      type:String,
    },
    innings1: {
      type: inningSchema,
    },
    innings2: {
      type: inningSchema,
    },
  },
  { strict: false }
);

module.exports = mongoose.model("Balls",ballsSchema);
module.exports = mongoose.model("Innings", inningSchema);
module.exports = mongoose.model("Scorecard", scorecardSchema);
