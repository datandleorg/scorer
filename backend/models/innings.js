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
const scoreSchema = new Schema({
  batsmen:{
    type:Schema.Types.ObjectId,
    ref:'Player'
  },
  runs:{
    type:Number,
  },
  balls:{
    type:Number,
  },
  one:{
    type:Number,
  },
  two:{
    type:Number,
  },
  four:{
    type:Number,
  },
  six:{
    type:Number,
  },
  st_rate:{
    type:Number,
  },
  out_by:{
    type:String,
  },
});
const totalSchema = new Schema({
  runs:{
    type:Number,
  },
  wickets:{
    type:Number,
  },
  over:{
    type:Number,
  },
});
const extrasSchema = new Schema({
  byes:{
    type:Number,
  },
  no_ball:{
    type:Number,
  },
  wide:{
    type:Number,
  },
});
const bowlerScoreSchema = new Schema({
  bowler:{
    type:Schema.Types.ObjectId,
    ref:'Player'
  },
  wickets:{
    type:Number,
  },
  overs:{
    type:Number,
  },
  maiden:{
    type:Number,
  },
  wide:{
    type:Number,
  },
  no_ball:{
    type:Number,
  },
  econ:{
    type:Number,
  },
  runs:{
    type:Number,
  },
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
  batting:{
    scores:[{
      type:scoreSchema,
    }],
    extras:{
      type:extrasSchema,
    },
    total:{
      type:totalSchema,
    }
  },
  bowling:{
    bowlerscores:[{
      type:bowlerScoreSchema,
    }],
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
module.exports = mongoose.model("Score",scoreSchema);
module.exports = mongoose.model("BowlerScore",bowlerScoreSchema);
module.exports = mongoose.model("Total",totalSchema);
module.exports = mongoose.model("Extras",extrasSchema);
module.exports = mongoose.model("Innings", inningSchema);
module.exports = mongoose.model("Scorecard", scorecardSchema);
