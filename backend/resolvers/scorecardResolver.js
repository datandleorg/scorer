const Scorecard = require("../models/innings");

module.exports = {
  scorecard: async () => {
    try {
      const scorecards = await Scorecard.findOne()
        .populate({ path: "innings1.striker", model: "Player" })
        .populate({ path: "innings1.non_striker", model: "Player" })
        .populate({ path: "innings1.bowler_1", model: "Player" })
        .populate({ path: "innings1.batting.scores.batsmen", model: "Player" })
        .populate({ path: "innings1.bowling.bowlerscores.bowler", model: "Player" })
        .populate({ path: "innings2.striker", model: "Player" })
        .populate({ path: "innings2.non_striker", model: "Player" })
        .populate({ path: "innings2.bowler_1", model: "Player" })
        .populate({ path: "innings2.batting.scores.batsmen", model: "Player" })
        .populate({ path: "innings2.bowling.bowlerscores.bowler", model: "Player" })
        .exec();
      return scorecards;
    } catch (err) {
      console.log(err);
    }
  },
  getScorecardById: async ({Id}) => {
    try {
      const singlescorecard = await Scorecard.findOne({_id:Id})
        .populate({ path: "innings1.striker", model: "Player" })
        .populate({ path: "innings1.non_striker", model: "Player" })
        .populate({ path: "innings1.bowler_1", model: "Player" })
        .populate({ path: "innings1.batting.scores.batsmen", model: "Player" })
        .populate({ path: "innings1.bowling.bowlerscores.bowler", model: "Player" })
        .populate({ path: "innings2.striker", model: "Player" })
        .populate({ path: "innings2.non_striker", model: "Player" })
        .populate({ path: "innings2.bowler_1", model: "Player" })
        .populate({ path: "innings2.batting.scores.batsmen", model: "Player" })
        .populate({ path: "innings2.bowling.bowlerscores.bowler", model: "Player" })
        .exec();
      return singlescorecard;
    } catch (err) {
      console.log(err);
    }
  },
  createScorecard: async ({ matchStatus, innings1, innings2 }) => {
    const scorecard = new Scorecard({
      matchStatus: matchStatus,
      innings1: {
        striker: innings1.striker,
        non_striker: innings1.non_striker,
        runs: innings1.runs,
        wickets: innings1.wickets,
        current_over: innings1.current_over,
        current_ball: innings1.current_ball,
        bowler_1: innings1.bowler_1,
        bowler_2: innings1.bowler_2,
        balls: innings1.balls,
        target: innings1.target,
        end: innings1.end,
        batting:innings1.batting,
        bowling:innings1.bowling,      
      },
      innings2: {
        striker: innings2.striker,
        non_striker: innings2.non_striker,
        runs: innings2.runs,
        wickets: innings2.wickets,
        current_over: innings2.current_over,
        current_ball: innings2.current_ball,
        bowler_1: innings2.bowler_1,
        bowler_2: innings2.bowler_2,
        balls: innings2.balls,
        target: innings2.target,
        end: innings2.end,
        batting:innings2.batting,
        bowling:innings2.bowling,      
      },
    });

    try {
      const result = await scorecard.save();
      const scorecards = await Scorecard.findById(result._id)
        .populate({ path: "innings1.striker", model: "Player" })
        .populate({ path: "innings1.non_striker", model: "Player" })
        .populate({ path: "innings1.bowler_1", model: "Player" })
        .populate({ path: "innings1.batting.scores.batsmen", model: "Player" })
        .populate({ path: "innings1.bowling.bowlerscores.bowler", model: "Player" })
        .populate({ path: "innings2.striker", model: "Player" })
        .populate({ path: "innings2.non_striker", model: "Player" })
        .populate({ path: "innings2.bowler_1", model: "Player" })
        .populate({ path: "innings2.batting.scores.batsmen", model: "Player" })
        .populate({ path: "innings2.bowling.bowlerscores.bowler", model: "Player" })
        .exec();
      return scorecards;
    } catch (err) {
      console.log(err);
    }
  },
  updateScorecard: async ({ scorecardId, matchStatus, innings1, innings2 }) => {
    const scorecardUpdate = await Scorecard.findById(scorecardId);
    await Scorecard.updateOne(
      { _id: scorecardId },
      { matchStatus: matchStatus, innings1: innings1, innings2: innings2 }
    );
    const updatedScorecard = await Scorecard.findById(scorecardId)
      .populate({ path: "innings1.striker", model: "Player" })
      .populate({ path: "innings1.non_striker", model: "Player" })
      .populate({ path: "innings1.bowler_1", model: "Player" })
      .populate({ path: "innings1.batting.scores.batsmen", model: "Player" })
      .populate({ path: "innings1.bowling.bowlerscores.bowler", model: "Player" })
      .populate({ path: "innings2.striker", model: "Player" })
      .populate({ path: "innings2.non_striker", model: "Player" })
      .populate({ path: "innings2.bowler_1", model: "Player" })
      .populate({ path: "innings2.batting.scores.batsmen", model: "Player" })
      .populate({ path: "innings2.bowling.bowlerscores.bowler", model: "Player" })
      .exec();
    return updatedScorecard;
  },
};

// updateScorecard: async ({ scorecardId, matchStatus, innings1, innings2 }) => {
//   const scorecardUpdate = await Scorecard.findById(scorecardId);
//   await Scorecard.updateOne(
//     { _id: scorecardId },
//     { matchStatus: matchStatus, innings1:{ striker:{_id:innings1.striker._id,name:innings1.striker.name,run:innings1.striker.run,wickets:innings1.striker.wickets,overs:innings1.striker.overs,bowl_runs:innings1.striker.bowl_runs,fours:innings1.striker.fours,sixes:innings1.striker.sixes,balls:innings1.striker.balls},non_striker:innings1.non_striker,bowler_1:innings1.bowler_1,runs:innings1.runs,wickets:innings1.wickets,current_over:innings1.current_over,current_ball:innings1.current_ball,end:innings1.end}, innings2: innings2 }
//   );
//   const updatedScorecard = await Scorecard.findById(scorecardId)
//     .populate({ path: "innings1.striker", model: "Player" })
//     .populate({ path: "innings1.non_striker", model: "Player" })
//     .populate({ path: "innings1.bowler_1", model: "Player" })
//     .populate({ path: "innings2.striker", model: "Player" })
//     .populate({ path: "innings2.non_striker", model: "Player" })
//     .populate({ path: "innings2.bowler_1", model: "Player" })
//     .exec();
//   return updatedScorecard;
// },
// };
