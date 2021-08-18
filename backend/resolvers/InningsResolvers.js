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
      nonstriker: args.inningsInput.nonstriker,
      runs: args.inningsInput.runs,
      wickets: args.inningsInput.wickets,
      currentover: args.inningsInput.currentover,
      currentball: args.inningsInput.currentball,
      bowler1: args.inningsInput.bowler1,
      bowler2: args.inningsInput.bowler2,
      balls: args.inningsInput.balls,
      target: args.inningsInput.target,
      end: args.inningsInput.end,
    });
    console.log(innings);
    try {
      const result = await innings.save();
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
