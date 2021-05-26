const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config({ path: "./config/.env" });

const app = express();
app.use(express.json());

//Add users
app.post("/", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send({ message: err });
    });
});

//Get all users
app.get("/users", (req, res) => {
  User.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send({ message: err });
    });
});

//Get user by ID
app.get("/users/:id", (req, res) => {
  User.findById(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send({ message: err });
    });
});

// Update user by ID
app.put("/users/:id", (req, res) => {
  User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send({ message: err });
    });
});

//Delete user
app.delete("/:id", (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then((data) => {
      res.send({ msg: "user removed ", data });
    })
    .catch((err) => {
      res.send({ message: err });
    });
});

// ConnectionDB
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  () => {
    console.log("The DATABASE is connected....");
  }
);

//Listenning to the port
app.listen(process.env.PORT, () => {
  console.log(`The DATABASE is connected on port ${process.env.PORT}`);
});
