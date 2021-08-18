const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teamSchema = new Schema(
    {
        name:{
            type:String,
            required:true
        },
        image:{
            type:String
        },
        score:{
            type:Number,
            required:true
        },
        matches:{
            type:Number,
            required:true
        },
        loss:{
            type:Number,
            required:true
        },
        won:{
            type:Number,
            required:true
        },
        tie:{
            type:Number,
            required:true
        },
        players:[{
            type:Schema.Types.ObjectId,
            ref:'Player'
        }],
        user:{
            type:Schema.Types.ObjectId,
            ref:'User'
        }
    }
)
module.exports =  mongoose.model('Team',teamSchema,'teams')