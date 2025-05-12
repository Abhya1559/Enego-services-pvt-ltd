import mongoose  from "mongoose";
import bcrypt from "bcryptjs";
// import { use } from "react";

const userSchema = new mongoose.Schema({
    name:{
        type:String,required:true
    },
    email:{
        type:String,required:true
    },
    password:{
        type:String,required:true
    },
    role:{
        type:String,enum:["Admin","Manager","Member"],required:true
    },
    companyId:{
        type:mongoose.Schema.Types.ObjectId,ref:"company",required:true
    }
})

//encrypt the password
userSchema.pre("save",async function (next) {
    if (this.isModified("password")) return next() ;
    this.password = await bcrypt.hash(this.password,10)
    next();
})

userSchema.methods.comparePassword = function(password){
    return bcrypt.compare(password,this.password)
}

const user = mongoose.model("User",userSchema)
export default user