import mongoose from "mongoose";
const todoSchema = new mongoose.Schema({
    task:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    completedTime:{
        type:Date
    },
    creationTime: {
        type: Date,
        default: Date.now,
    }
    

},{timestamps:true})
export default mongoose.model("TodoAppScehma",todoSchema)