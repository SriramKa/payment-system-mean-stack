const express = require("express");
const Item = require("../models/item");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const items = await Item.find({});
  console.log(items);
  res.status(200).send(items);
});

module.exports = router;
