import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    priority:{
        type:String,
        required:true
    }    ,
    query:{
        type:String,
        required:true
    },
    remark:{
        type:String,
        default:null
    },
    status:{
        type:Number,
        default:0
    }
    
},{timestamps:true});

export default mongoose.model("Users",userSchema);