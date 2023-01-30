const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ mensaje: "Hola Mundo" });
});

module.exports = router;
