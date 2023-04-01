const mongoose = require("mongoose");
const StudentSchema = new mongoose.Schema({
  name: {
    type: "string",
  },
  age: { type: "number", default: 18 },
  diaChi: {
    type: "string",
  },
});
const StudentModel = mongoose.model("student", StudentSchema);
module.exports = StudentModel;
