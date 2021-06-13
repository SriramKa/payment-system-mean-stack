const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
mongoose.set("debug", true);

const port = process.env.PORT || 8080;

//setting up express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

//connecting to the database and starting the server
mongoose
  .connect(process.env.DBURL, {
    //to avoid deprecation warnings:
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((db) => {
    console.log("Connected to db, good job");
    app.listen(port, () => console.log(`App running at port ${port}`));
  })
  .catch((err) => {
    console.log("Error in connecting to the db: \n", err);
  });

//adding routes
const itemsRoute = require("./routes/items");
app.use("/items", itemsRoute);

//for all undefined routes:
app.use((req, res, next) => res.status(404).end("Route not found."));
