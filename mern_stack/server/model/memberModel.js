import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({

    name:{ type:String, required:true },
    email:{ type:String, required:true },
    password:{ type:String, required:true }
},{timestamps:true});

export default mongoose.model("Members",memberSchema);