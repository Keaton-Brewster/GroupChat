const router = require("express").Router();
const db = require("../models");

router.get("/:convo_id", (req, res) => {
  const convo_id = req.params.convo_id;
  try {
    db.Message.find({ conversation_id: convo_id })
      .then((messages) => {
        res.send(messages);
      })
      .catch((e) => {
        console.error(e);
        res.sendStatus(400);
      });
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

module.exports = router;
