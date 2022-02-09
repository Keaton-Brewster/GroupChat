const router = require("express").Router();
const passport = require("../Passport");
const db = require("../models");

router.post("/login", passport.authenticate("local"), (request, response) => {
  const { user } = request;
  response.send(user).status(200);
});

module.exports = router;
