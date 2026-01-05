const express=require('express')
const Question=require('../models/Question')
const router=express.Router()

const auth = require("../middleware/Auth");



// Add Question API
router.post("/add", auth,async (req, res) => {
  try {
    const q = new Question(req.body);
    await q.save();
    res.json({ message: "Question Added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Generate Question Paper
router.get("/generate",auth, async (req, res) => {
  const paper = await Question.find();
  res.json(paper);
});
//delete question
router.delete("/delete/:id",auth, async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.json({ message: "Question deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports=router;