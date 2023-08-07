import mongoose from "mongoose";
const userSchema=mongoose.Schema({
    name:{
    type:String,
     required:true
    },
    id:{
        type:Number,
        required:true
    },
    age:{
        type:Number,
        required:true
    }
})
const Create=mongoose.model("Create",userSchema);
export default Create;