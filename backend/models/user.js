const mongoose=require('mongoose');
const userSchema=require('../schema/userschema');

const user=mongoose.model("user",userSchema);
module.exports=user;