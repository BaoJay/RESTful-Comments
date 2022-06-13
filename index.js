// Access things from NPM Modules
const express = require("express");
const app = express();
const path = require("path");
// Provide a new name for v4
const { v4: uuid } = require("uuid");

// app.use is executed everytime the request
// is sent to the server
// For parsing request body data (POST method)
app.use(express.urlencoded({ extended: true }));
// Parse data application/json
app.use(express.json());

// Tell the app that we use EJS
app.set("view engine", "ejs");
// Set an absolute path for views directory
app.set("views", path.join(__dirname, "/views"));

// Add comments data
const comments = [
  {
    id: uuid(),
    username: "Bao",
    comment: "Đây la Gia Bảo nè!!",
  },
  {
    id: uuid(),
    username: "Truong",
    comment: "Truong Pham dep trai the!",
  },
  {
    id: uuid(),
    username: "Thi",
    comment: "Anh Thi hoc nhanh qua!!",
  },
  {
    id: uuid(),
    username: "Phuoc",
    comment: "UI gioi oi! Dong nghiep.",
  },
];

app.get("/comments", (req, res) => {
  res.render("comments/index", { comments });
});

app.get("/comments/new", (req, res) => {
  res.render("comments/new");
});

// Create a POST route =======================
app.post("/comments", (req, res) => {
  console.log(req.body);
  // Phải destructuring object mới lấy data được
  const { username, comment } = req.body;
  comments.push({ username, comment, id: uuid() });
  // res.send("Ngon lành!!!! It worked!!");
  // Redirect url and update the info
  res.redirect("/comments");
});

// Create a SHOW route ======================
app.get("/comments/:id", (req, res) => {
  // Destructuring data
  const { id } = req.params;
  // hàm find(): nếu trong array có phần tử nào giống thì lấy
  // ra phần tử đầu tiên
  const comment = comments.find((m) => m.id === id);
  console.log(comment);
  // res.send("được nè!");
  // Redirect đến show.ejs
  res.render("comments/show", { comment });
});

// // ====== Test comtam ==================
// app.get("/comtam", (req, res) => {
//   res.send("GET /comtam respone!!");
// });

// app.post("/comtam", (req, res) => {
//   console.log(req.body);
//   const { mon, sluong } = req.body;
//   res.send(`Ok, đây là đơn hàng của bạn: Món ${mon}, với số lượng ${sluong}`);
// });

app.listen(3005, () => {
  console.log("Listening on post 3005 !!");
});
