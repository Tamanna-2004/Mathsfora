const { Schema, model } = require("mongoose");
  
  const UserSchema = new Schema({
    name: {
      type: String,
      required: true,
      maxlength: 50
    },
    email:{
        type: String,
        required: true,
        unique: true, // Make sure email is unique in the database
    },
    phone:{
        type: String,
        required: true,
        match: /^[0-9]{10}$/,
    },
    password:{
        type: String,
        required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  const UserModel = model("User", UserSchema)
  
  module.exports = UserModel