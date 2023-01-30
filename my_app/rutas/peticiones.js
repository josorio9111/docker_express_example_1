const express = require("express");
const router = express.Router();
const axios = require('axios');

router.get("/p", async (req, res) => {
  await axios
    .get("https://reqres.in/api/users?page=2")
    .then((result) => {
      res.status(200).json({ data: JSON.stringify(result.data) });
    })
    .catch((error) => {
      res.status(404).json({ error: error });
    });
});

module.exports = router;
