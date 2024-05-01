const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("site/about", { source: "about.jpg" });
});

module.exports = router;
