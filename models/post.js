const mongoose = require("mongoose")

const postSchema  = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
     desc:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    image:{
        type:String,
        default:""
},
  createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
  }
})

module.exports = mongoose.model("post", postSchema)