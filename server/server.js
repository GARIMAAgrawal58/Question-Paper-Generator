const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/question_paper_db")
.then(() => console.log("Connected to MongoDB"))
.catch(() => console.log("Connection error"));


const app = express();
app.use(cors());
app.use(express.json());



// Import Routes
const questionRoutes = require("./routes/questionRoutes");
app.use("/questions", questionRoutes);
const AdminRoutes=require('./routes/AdminRoutes')
app.use('/admin',AdminRoutes)

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
