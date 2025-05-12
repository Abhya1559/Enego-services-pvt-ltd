import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({

    name:{type:String,required:true},
    description:{ type:String},
    createdBy:{ 
        type:mongoose.Schema.Types.ObjectId,ref:"User",required:true
    },
    companyId:{
        type:mongoose.Schema.Types.ObjectId,ref:"Company",required:true
    }
})

module.exports = mongoose.model("Project",projectSchema)