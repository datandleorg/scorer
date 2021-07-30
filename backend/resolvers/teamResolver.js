const Team = require("../models/teams");
const Player = require("../models/Players")

module.exports = {
    teams:async ()=>{
        try{
           const teams = await Team.find();
        return teams.map(team=>{
            return{
                ...team._doc,
                _id:team.id
            }
        })
        }
        catch(err){
            console.log(err)
        }
    },
    getTeamById: async ({teamId})=>{
        try{
            const singleTeam = await Team.findOne({_id:teamId});
            return{
                    ...singleTeam._doc,
                    _id:singleTeam.id
            }
        }
        catch(err){
            console.log(err)
        }
},
    createTeam:async(args)=>{
            const team = new Team({
                name:args.teamInput.name,
                score:args.teamInput.score,
                matches:args.teamInput.matches,
                loss:args.teamInput.loss,
                won:args.teamInput.won,
                tie:args.teamInput.tie,
                player:"60fe4eb07257332e300eecd6"

            })
            return team.save()
            .then(result=>{
                return Player.findById("60fe4eb07257332e300eecd6")
            }).then(player=>{
                player.team.push(team);
                return player.save();
            })
            .then(result=>{
                return{...result._doc,
                    _id:result.id};
            })
            .catch(err=>{
                console.log(err);
            })
    },
    updateTeam:async(args)=>{
        try{
        const teamUpdate = await Team.findById(args.teamId);
        await Team.updateOne({_id:args.teamId},{$inc:{score:50}});
        return({
            ...teamUpdate._doc,
            _id:teamUpdate.id
        })
    }catch(err){
        console.log(err);
    }
 },
 deleteTeam:async(args)=>{
     try{
         const teamdelete = await Team.findById(args.teamId);
         await Team.deleteOne({_id:args.teamId});
         return({
             ...teamdelete._doc,
             _id:teamdelete.id
         })
     }catch(err){
         console.log(err);
     }
 }
}