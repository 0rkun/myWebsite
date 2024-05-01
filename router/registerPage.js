const express = require("express");
const router = express.Router();
// const { join } = require("path");
// const User = require(join(__dirname, "..", "model", "userModal.js"));

router.get("/", (req, res) => {
  res.render("site/register");
});

router.post("/", (req, res) => {
  res.render("site/add");
});

module.exports = router;
