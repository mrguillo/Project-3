const router = require("express").Router();
const challengeMeController = require("../../controllers/challengeMeController");

// Matches with "/api/books"
router.route("/create")
  .post(
    challengeMeController.createActivity
    )
router.route("/approval")
    .post(
        challengeMeController.activityApproval
    )
router.route("/unapproved")
      .get(challengeMeController.unapproved)
module.exports = router;