const Team = require("../models/teams");
const Player = require("../models/Players");

module.exports = {
  teams: async () => {
    try {
      const teams = await Team.find()
        .populate({ path: "players", model: "Player" })
        .exec();
      return teams;
    } catch (err) {
      console.log(err);
    }
  },
  getTeamById: async ({ teamId }) => {
    try {
            const teamData = await Team.findById(teamId)
        .populate({ path: "players", model: "Player" })
        .exec();
      return teamData;
    } catch (err) {
      console.log(err);
    }
  },
  createTeam: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    const team = new Team({
      name: args.teamInput.name,
      image: args.teamInput.image,
      score: args.teamInput.score,
      matches: args.teamInput.matches,
      loss: args.teamInput.loss,
      won: args.teamInput.won,
      tie: args.teamInput.tie,
      players: [],
      user: req.userId,
    });
    return team
      .save()
      .then((result) => {
        return { ...result._doc, _id: result.id };
      })
      .catch((err) => {
        console.log(err);
      });
  },
  updateTeam: async ({teamId,teamData}) => {
    try {
      const teamUpdate = await Team.findById(args.teamId);
      await Team.updateOne({ _id:args.teamId }, {name:args.name,mathes:args.matches,loss:args.loss,won:args.won,tie:args.tie});
      return {
        ...teamUpdate._doc,
        _id: teamUpdate.id,
      };
    } catch (err) {
      console.log(err);
    }
  },
  deleteTeam: async (args) => {
    try {
      const teamdelete = await Team.findById(args.teamId);
      await Team.deleteOne({ _id: args.teamId });
      return {
        ...teamdelete._doc,
        _id: teamdelete.id,
      };
    } catch (err) {
      console.log(err);
    }
  },
  addPlayerToTeam: async (args) => {
    try {
      const fetchPlayer = await Player.findById(args.playerId);
      const team = await Team.findByIdAndUpdate(
        { _id: args.teamId },
        { $push: { players: fetchPlayer } }
      );
      const teamData = await Team.findById(args.teamId)
        .populate({ path: "players", model: "Player" })
        .exec();
      return teamData;
    } catch (err) {
      console.log(err);
    }
  },
  deletePlayerFromTeam: async (args) => {
    try {
      await Team.updateOne(
        { _id: args.teamId },
        { $pull: { players: args.playerId } },
        { safe: true }
      ).exec();
      const teams = await Team.findById({ _id: args.teamId })
        .populate("players")
        .exec();
      return teams;
    } catch (err) {
      console.log(err);
    }
  },
};
