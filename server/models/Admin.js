const mongoose=require('mongoose')



//admin schema
const adminSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
})

//admin model

module.exports= mongoose.model("Admin",adminSchema)