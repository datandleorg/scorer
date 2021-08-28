const Match = require("../models/matches");

module.exports = {
  matches: async () => {
    try {
      const matches = await Match.find()
        .populate({
          path: "team1",
          model: "Team",
          populate: { path: "players", model: "Player" },
        })
        .populate({
          path: "team2",
          model: "Team",
          populate: { path: "players", model: "Player" },
        })
        .exec();
      return matches;
    } catch (err) {
      console.log(err);
    }
  },
  createMatch: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    const match = new Match({
      overs: args.matchInput.overs,
      team1: args.matchInput.team1,
      team2: args.matchInput.team2,
      tossWonBy: args.matchInput.tossWonBy,
      battingFirst: args.matchInput.battingFirst,
      user: req.userId,
    });
    try {
      const matches = await match.save();
      const updatedmatch = Match.findById(matches._id)
        .populate({
          path: "team1",
          model: "Team",
          populate: { path: "players", model: "Player" },
        })
        .populate({
          path: "team2",
          model: "Team",
          populate: { path: "players", model: "Player" },
        })
        .exec();
      return updatedmatch;
    } catch (err) {
      console.log(err);
    }
  },
  getMatchById: async ({ matchId }) => {
    try {
      const matches = await Match.findById(matchId)
        .populate({
          path: "team1",
          model: "Team",
          populate: { path: "players", model: "Player" },
        })
        .populate({
          path: "team2",
          model: "Team",
          populate: { path: "players", model: "Player" },
        })
        .exec();
      return matches;
    } catch (err) {
      console.log(err);
    }
  },
  deleteMatch: async (args) => {
    try {
      const matchdelete = await Match.findById(args.matchId);
      await Match.deleteOne({ _id: args.matchId });
      return {
        ...matchdelete._doc,
        _id: matchdelete.id,
      };
    } catch (err) {
      console.log(err);
    }
  },
};
