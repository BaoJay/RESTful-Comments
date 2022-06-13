const express = require("express");
const app = express();
const path = require("path");

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
    username: "Bao",
    comment: "Đây la Gia Bảo nè!!",
  },
  {
    username: "Truong",
    comment: "Truong Pham dep trai the!",
  },
  {
    username: "Thi",
    comment: "Anh Thi hoc nhanh qua!!",
  },
  {
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

// Create a POST route
app.post("/comments", (req, res) => {
  console.log(req.body);
  // Phải destructuring object mới lấy data được
  const { username, comment } = req.body;
  comments.push({ username, comment });
  // res.send("Ngon lành!!!! It worked!!");
  // Redirect url and update the info
  res.redirect("/comments");
});

app.get("/comtam", (req, res) => {
  res.send("GET /comtam respone!!");
});

app.post("/comtam", (req, res) => {
  console.log(req.body);
  const { mon, sluong } = req.body;
  res.send(`Ok, đây là đơn hàng của bạn: Món ${mon}, với số lượng ${sluong}`);
});

app.listen(3005, () => {
  console.log("Listening on post 3005 !!");
});
