const mongoose = require("mongoose");



// Question Schema
const questionSchema = new mongoose.Schema({
  subject: String,
  questionText: String,
  difficulty: String,
  marks: Number,
});



module.exports=mongoose.model("Question", questionSchema);