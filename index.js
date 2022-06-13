// Access things from NPM Modules
const express = require("express");
const app = express();
const path = require("path");
// Provide a new name for v4
const { v4: uuid } = require("uuid");
// Install method-override
const methodOverride = require("method-override");

// app.use is executed everytime the request
// is sent to the server
// For parsing request body data (POST method)
app.use(express.urlencoded({ extended: true }));
// Parse data application/json
app.use(express.json());

// Added method-override to use _method in query string
app.use(methodOverride("_method"));

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

// Create a POST method =======================
app.post("/comments", (req, res) => {
  console.log(req.body);
  // Phải destructuring object mới lấy data được
  const { username, comment } = req.body;
  comments.push({ username, comment, id: uuid() });
  // res.send("Ngon lành!!!! It worked!!");
  // Redirect url and update the info
  res.redirect("/comments");
});

// Create a SHOW method ======================
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

// Create a PATCH method =================================
// Test HTTP request method code in POSTMAN
app.patch("/comments/:id/edit", (req, res) => {
  // Lấy id từ trên url query string
  const { id } = req.params;
  // Lấy key-value từ req.body via Postman
  const replaceComment = req.body.editComment;
  const foundComment = comments.find((m) => m.id === id);
  // Gán new text cho comment mới
  foundComment.comment = replaceComment;
  console.log(req.body);
  res.redirect("/comments");
});

// Create a EDIT method ================
app.get("/comments/:id/edit", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((m) => m.id === id);
  res.render("comments/edit", { comment });
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
