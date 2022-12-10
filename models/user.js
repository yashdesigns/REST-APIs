const mongoose = require("mongoose")

const userSchema  = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:3
    },
     email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
     password:{
        type:String,
        required:true,
        min:4,
        max:20
    },
})

module.exports = mongoose.model("user", userSchema)