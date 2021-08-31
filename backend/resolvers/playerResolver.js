const Player = require("../models/Players");

module.exports = {
    players:async ()=>{
        try{
           const players = await Player.find();
        return players.map(player =>{
            return{
                ...player._doc,
                _id:player.id
            }
        })
        }
        catch(err){
            console.log(err)
        }
    },
    getPlayerById: async ({playerId})=>{
            try{
                const singlePlayer = await Player.findOne({_id:playerId});
                return{
                        ...singlePlayer._doc,
                        _id:singlePlayer.id
                }
            }
            catch(err){
                console.log(err)
            }
    },
    createPlayer:async (args,req)=>{
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
          }
            const player = new Player({
                name:args.playerInput.name,
                battingStyle:args.playerInput.battingStyle,
                bowlingStyle:args.playerInput.bowlingStyle,
                run:args.playerInput.run,
                totalRuns:args.playerInput.totalRuns,
                wickets:args.playerInput.wickets,
                totalWickets:args.playerInput.totalWickets,
                image:args.playerInput.image,
                overs:args.playerInput.overs,
                totalOvers:args.playerInput.totalOvers,
                fours:args.playerInput.fours,
                totalFours:args.playerInput.totalFours,
                sixes:args.playerInput.sixes,
                totalSixes:args.playerInput.totalSixes,
                thirty:args.playerInput.thirty,
                fifty:args.playerInput.fifty,
                balls:args.playerInput.balls,
                totalBalls:args.playerInput.totalBalls,
                st_rate:args.playerInput.st_rate,
                matches:args.playerInput.matches,
                bowl_run:args.playerInput.bowl_run,
                bowl_rate:args.playerInput.bowl_rate,
                avg:args.playerInput.avg,
                bowl_avg:args.playerInput.bowl_avg,
                user:req.userId
            })
            try{
                const result = await player.save();
                return({
                    ...result._doc,
                    _id:result.id
                })
            }
            catch(err){
                console.log(err);
            }
    },
    updatePlayer:async (args)=>{
        try{
            const playerUpdate = await Player.findById(args.playerId);
         await Player.updateOne({_id:args.playerId},{name:args.name,run:args.run,balls:args.balls,fours:args.fours,sixes:args.sixes,overs:args.overs,bowl_runs:args.bowl_runs,wickets:args.wickets,totalRuns:args.totalRuns,totalBalls:args.totalBalls,totalWickets:args.totalWickets,totalFours:args.totalFours,totalSixes:args.totalSixes});
                return({
                    ...playerUpdate._doc,
                    _id:playerUpdate.id
                })
        }catch(err){
            console.log(err);
        }
    },
    deletePlayer:async (args)=>{
        try{
        const playerdelete = await Player.findById(args.playerId);
        await Player.deleteOne({_id:args.playerId});
        return({
            ...playerdelete._doc,
            _id:playerdelete.id
        })
    }
    catch(err){
        console.log(err);
    }
    }
}