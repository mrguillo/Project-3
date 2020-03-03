const router = require("express").Router();
const challengeController = require("../../controllers/challengeController");

// Matches with "/api/books"
router.route("/create")
      .post(challengeController.createChallenge)
router.route("/join")
      .post(challengeController.joinChallenge)
router.route("/find/:challengeId")
      .get(challengeController.findChallenge)
router.route("/start")
      .post(challengeController.startChallenge)

module.exports = router;
