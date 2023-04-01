const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Student = require("../Student");

const uri =
  "mongodb+srv://minhnqph25450:Minh31223@cluster0.kwb6qtf.mongodb.net/?retryWrites=true&w=majority";

router.get("/home", async function (req, res, next) {
  await mongoose.connect(uri).then(console.log("connect mongoDb thanh cong"));
  let arrStudent = [];
  arrStudent = await Student.find().lean();
  for (let i = 0; i < arrStudent.length; i++) {
    let sv = arrStudent[i];
    console.log(`Sinh vien thu ${i + 1}:`);
    console.log(`name: ${sv.name}, id: ${sv._id}`);
  }
  // console.log(arrStudent);
  // console.log(arrStudent.length + "");

  res.render("home", { arrStudent });
});

module.exports = router;
