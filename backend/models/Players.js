const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playersSchema = new Schema(
    {
        name:{
            type:String,
            required:true
        },
        battingStyle:{
            type:String,
            required:true    
        },
        bowlingStyle:{
            type:String,
            required:true
        },
        wickets:{
            type:Number,
            required:true
        },
        run:{
            type:Number,
            required:true
        },
        image:{
            type:String
        },
        team:{
            type:Schema.Types.ObjectId,
            ref:'Team'
        }
    }
)
module.exports=mongoose.model('Player',playersSchema);