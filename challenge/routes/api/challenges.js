const router = require("express").Router();
const challengeMeController = require("../../controllers/challengeMeController");

// Matches with "/api/books"
router.route("/create")
  .post(
    challengeMeController.createChallenge
    )
router.route("/join")
  .post(challengeMeController.joinChallenge)

router.route("/find/:challengeId")
  .get(challengeMeController.findChallenge)
router.route("/start")
  .post(challengeMeController.startChallenge)

module.exports = router;
