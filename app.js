const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const Student = require("./Student");
const homeRouter = require("./routers/Home");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine", "hbs");
app.use("/", homeRouter);
app.set("views", "./views");
app.engine(
  ".hbs",
  exphbs.engine({
    extname: "hbs",
    defaultLayout: false,
    layoutsDir: "views/",
  })
);

const uri =
  "mongodb+srv://minhnqph25450:Minh31223@cluster0.kwb6qtf.mongodb.net/?retryWrites=true&w=majority";

app.get("/add_student", async (req, res) => {
  await mongoose.connect(uri).then(console.log("connect mongoDb thanh cong"));
  let sv = new Student({
    name: "Minh 221",
    age: 22,
  });
  sv.diaChi = "HN";
  try {
    console.log(sv);
    await sv.save();
    res.send(sv);
  } catch (err) {
    res.send("loi post");
  }
});
app.get("/", function (req, res) {
  res.render("login");
});
// app.get("/home", async (req, res) => {
//   await mongoose.connect(uri).then(console.log("connect mongoDb thanh cong"));
//   let arrStudent = [];
//   arrStudent = await Student.find();
//   for (let i = 0; i < arrStudent.length; i++) {
//     let sv = arrStudent[i];
//     console.log(`Sinh vien thu ${i + 1}:`);
//     console.log(`name: ${sv.name}, id: ${sv._id}`);
//   }

//   res.render("home", { title: "arrStudent", arrStudent });
// });
app.listen(3000, () => {
  console.log("Server is running at port 3000");
});

app.get("/student/delete/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const deletedStudent = await Student.findByIdAndDelete(_id);
    if (!deletedStudent) {
      return res.status(404).send("Sinh viên không tồn tại");
    }
    res.redirect("/home");
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi server khi xóa sinh viên");
  }
});

app.post("/student/add", async (req, res) => {
  await mongoose.connect(uri).then(console.log("Ket noi DB thanh cong."));
  console.log(req.body);
  let ten = req.body.nameStudent;
  let ageText = req.body.age;
  let diachiText = req.body.diachi;
  const st = new Student({ name: ten, age: ageText, diachi: diachiText });
  st.save()
    .then(() => console.log("Saved!"))
    .catch((err) => console.error(err));
  res.redirect("/home");
});

app.get("/student/:id/edit", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const student = await Student.findById(id).lean();
    if (!student) {
      return res.status(404).send("Không tìm thấy sinh viên");
    }
    res.render("register", { student });
  } catch (error) {
    console.error(error);
    res.status(500).send("Lỗi server");
  }
});
app.post("/student/:id", async (req, res) => {
  await mongoose.connect(uri).then(console.log("Ket noi DB thanh cong."));
  const id = req.params.id;
  let ten = req.body.nameStudent;
  let ageText = req.body.age;
  let diachiText = req.body.diachi;
  Student.findByIdAndUpdate(id, {
    name: ten,
    age: ageText,
    diachi: diachiText,
  })
    .then(() => console.log("Saved!"))
    .catch((err) => console.error(err));
  res.redirect("/home");
});
