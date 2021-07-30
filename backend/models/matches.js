const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const matchSchema = new Schema({
       overs:{
           type:Number,
           required:true
       },
       tossWonBy:{
           type:String,
           required:true
       },
       battingFirst:{
           type:String,
           required:true
       },
       team1:{
           type:String,
           required:true
       },
       team2:{
        type:String,
        required:true
    },
       team:{
           type:Schema.Types.ObjectId,
           ref:'Team'
       },
       player:{
           type:Schema.Types.ObjectId,
           ref:'Player'
       }
})

module.exports = mongoose.model('Match',matchSchema)