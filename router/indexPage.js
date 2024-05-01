const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("site/index", { source: "home.jpg" });
});

module.exports = router;
