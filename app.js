const express = require("express");
const { engine } = require("express-handlebars");
const expressSession = require("express-session");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const path = require("path");
const dbs = require(path.join(__dirname, "dbs.js"));
const crypto = require("crypto");

/* DB CONNECT*/
dbs();
//başlangıç ayarları
dotenv.config();

const app = express();

//degişkenler
const time = 1000 * 60 * 30; //30 dk
const SECRET_VALUE = process.env.SECRET_VALUE || "myBlog";
const PORT = process.env.PORT || 5000;
const API_URL = process.env.API_URL || "http://127.0.0.1:5000";

//şablon motorunun bulundugu alan (express handlebars kullanımı)
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

//middleware(ara yazılım) *önce çalışsın*
app.use(express.json());
app.use(fileUpload());
app.use(
  expressSession({
    secret: SECRET_VALUE,
    resave: false,
    saveUninitialized: true,
    cookie: { path: "/", httpOnly: true, secure: false, maxAge: time },
  })
);

app.use(express.static(path.join(__dirname, "public")));

// app.get("/text", (req, res) => {
//   res.json({ message: "adsgdghsdfh" }); ÖRNEK
// });

//Router Tanımlama alanı
const indexPage = require(path.join(__dirname, "router", "indexPage.js"));
const aboutPage = require(path.join(__dirname, "router", "aboutPage.js"));
const addPage = require(path.join(__dirname, "router", "addPage.js"));
const loginPage = require(path.join(__dirname, "router", "loginPage.js"));
const registerPage = require(path.join(__dirname, "router", "registerPage.js"));

//Router kullanım alanı
app.use("/", indexPage);
app.use("/about", aboutPage);
app.use("/add", addPage);
app.use("/login", loginPage);
app.use("/register", registerPage);
app.use("/", (req, res, next) => {
  res.render("site/error");
});

app.listen(PORT, () => {
  console.log(`server is running ${API_URL}`);
});
