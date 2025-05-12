import mongoose, { mongo } from "mongoose";

const taskSchema = new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String},
    status:{
        type:String,enum:['TO do',"In progress","Done"],default:"TO do"
    },
    assignedTo:{
        type:mongoose.Schema.Types.ObjectId, ref:'User'
    },
      projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
})

mongoose.exports = mongoose.model("Task",taskSchema)