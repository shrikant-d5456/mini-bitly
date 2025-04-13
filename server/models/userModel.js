import mongoose from "mongoose";


const userSchema = new mongoose.Schema({

    email:String,
    password:String,
    role:{
        type:String,
        default:"Visitor"
    }
})

const UserModel = mongoose.model("users",userSchema);
export default UserModel;
