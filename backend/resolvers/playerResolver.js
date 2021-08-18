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
                wickets:args.playerInput.wickets,
                image:args.playerInput.image,
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
         await Player.updateOne({_id:args.playerId},{name:"ms dhoni"},{$inc:{run:20,wickets:10}});
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