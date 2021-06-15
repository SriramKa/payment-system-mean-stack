const express = require("express");
const request = require("request");
const Item = require("../models/item");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const items = await Item.find({});
  res.status(200).send(items);
});

router.post("/buy/:id", async (req, res, next) => {
  const item = await Item.findById(req.params.id);

  request.post(
    {
      url: "https://api.razorpay.com/v1/orders",
      auth: {
        user: process.env.RAZORPAY_KEY_ID,
        pass: process.env.RAZORPAY_KEY_SECRET,
      },
      json: {
        amount: item.price,
        currency: "INR",
      },
    },
    (error, response, body) => {
      console.log(body);
      res.send({
        key: process.env.RAZORPAY_KEY_ID,
        amount: item.price * 100,
        currency: "INR",
        name: "MEAN Stack Shop",
        description: item.name,
        order_id: body.id,
      });
    }
  );
});

module.exports = router;
