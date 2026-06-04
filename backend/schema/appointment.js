const mongoose=require('mongoose');

const appointmentSchema=new mongoose.Schema(
    {
  user_id:{
    type:String,
    required:true,
  },
  day:{
    type:String,
    required:true,
  },
  time_slot:{
    type:String,
    required:true,
  },
  info:{
    type:String,
    required:true,
  },
  description:{
     type:String,
  }

    },{ timestamps: true }
);

module.exports=appointmentSchema;