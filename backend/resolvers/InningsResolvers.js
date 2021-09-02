const Innings = require("../models/innings");

module.exports = {
  innings: async () => {
    try {
      const inningss = await Innings.find();
      return inningss.map((inning) => {
        return {
          ...inning._doc,
          _id: inning.id,
        };
      });
    } catch (err) {
      console.log(err);
    }
  },
  createInnings: async (args) => {
    const innings = new Innings({
      striker: args.inningsInput.striker,
      non_striker: args.inningsInput.nonstriker,
      runs: args.inningsInput.runs,
      wickets: args.inningsInput.wickets,
      current_over: args.inningsInput.currentover,
      current_ball: args.inningsInput.currentball,
      bowler_1: args.inningsInput.bowler1,
      bowler_2: args.inningsInput.bowler2,
      balls: args.inningsInput.balls,
      target: args.inningsInput.target,
      end: args.inningsInput.end,
      batting:args.inningsInput.batting,
      bowling:args.inningsInput.bowling,      
    });
    console.log(innings);
    try {
      const result = await innings.populate({path:"striker",model:"Player"})
      .populate({path:"non_striker",model:"Player"})
      .populate({path:"batting",model:"batting"})
      .populate({path:"bowling",model:"bowling"})
      .exec();
      console.log(result._doc);
      return {
        ...result._doc,
        _id: result.id,
      };
    } catch (err) {
      console.log(err);
    }
  },
};
