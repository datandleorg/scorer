const Match = require("../models/matches");

module.exports = {
    matches:async ()=>{
        try{
           const matches = await Match.find();
        return matches.map(match=>{
            return{
                ...match._doc,
                _id:match.id
            }
        })
        }
        catch(err){
            console.log(err)
        }
    },
    createMatch:async(args)=>{
            const match = new Match({
                overs:args.matchInput.overs,
                team1:args.matchInput.team1,//team
                team2:args.matchInput.team2,//team
                tossWonBy:args.matchInput.tossWonBy,
                battingFirst:args.matchInput.battingFirst
                })
            try{
                const result = await match.save();
                return({
                    ...result._doc,
                    _id:result.id
                })
            }
            catch(err){
                console.log(err);
            }
    },
    deleteMatch:async (args)=>{
        try{
        const matchdelete = await Match.findById(args.matchId);
        await Match.deleteOne({_id:args.matchId});
        return({
            ...matchdelete._doc,
            _id:matchdelete.id
        })
    }
    catch(err){
        console.log(err);
    }
    }
}