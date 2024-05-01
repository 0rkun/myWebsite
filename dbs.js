const moongose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const conn = () => {
  moongose
    .connect(process.env.DB_URL, {
      dbName: "myBlog",
    })
    .then(() => {
      console.log("DB connected");
    })
    .catch((err) => {
      console.log("error");
    });
};

module.exports = conn;
