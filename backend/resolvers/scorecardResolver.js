const { findByIdAndUpdate, updateOne } = require("../models/innings");
const Scorecard = require("../models/innings");

module.exports = {
  scorecard: async () => {
    try {
      const scorecards = await Scorecard.findOne().exec();
      return {
        ...scorecards._doc,
        _id: scorecards.id,
      };
    } catch (err) {
      console.log(err);
    }
  },
  createScorecard: async ({ innings1, innings2 }) => {
    const scorecard = new Scorecard({
      innings1: {
        striker: innings1.striker,
        nonstriker: innings1.nonstriker,
        runs: innings1.runs,
        wickets: innings1.wickets,
        currentover: innings1.currentover,
        currentball: innings1.currentball,
        bowler1: innings1.bowler1,
        bowler2: innings1.bowler2,
        balls: innings1.balls,
        target: innings1.target,
        end: innings1.end,
      },
      innings2: {
        striker: innings2.striker,
        nonstriker: innings2.nonstriker,
        runs: innings2.runs,
        wickets: innings2.wickets,
        currentover: innings2.currentover,
        currentball: innings2.currentball,
        bowler1: innings2.bowler1,
        bowler2: innings2.bowler2,
        balls: innings2.balls,
        target: innings2.target,
        end: innings2.end,
      },
    });

    try {
      const result = await scorecard.save();
      console.log(scorecard);
      return {
        ...result._doc,
        _id: result.id,
      };
    } catch (err) {
      console.log(err);
    }
  },
  updateScorecard: async  ({scorecardId,innings1,innings2})=>{
    // const innins1 = inninsg1;
    // const innins2 = innings2;
    const scorecardUpdate = await Scorecard.findById(scorecardId);
     await Scorecard.updateOne({_id:scorecardId},{innings1:innings1,innings2:innings2});
    //scorecardUpdate.innings1.striker = args.striker;
    //await scorecardUpdate.save();
    return scorecardUpdate;
  }
};
