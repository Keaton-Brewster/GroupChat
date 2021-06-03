const router = require("express").Router();
const bcrypt = require("bcryptjs");

const mongoose = require("mongoose");
const passport = require("../config/passport");

const ObjectId = require("mongodb").ObjectId;
const db = require("../models");

router.post("/signup", (request, response) => {
  try {
    request.body.password = bcrypt.hashSync(request.body.password, 10);
    db.User.create({
      email: request.body.email,
      password: request.body.password,
      name: request.body.name,
      phone: request.body.phone,
    })
      .then((user) => {
        response.send(user);
      })
      .catch((error) => {
        console.error(error);
        response.sendStatus(400);
      });
  } catch (error) {
    console.error(error);
    response.sendStatus(500);
  }
});

router.post("/login", passport.authenticate("local"), (request, response) => {
  response.send(request.user);
});

module.exports = router;
