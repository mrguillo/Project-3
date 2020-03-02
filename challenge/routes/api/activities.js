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
      .post(challengeMeController.unapproved)
      .get(challengeMeController.unapproved)

router.route("/approvedinperiod/:challengeId")
    .get(challengeMeController.approvedInPeriod)

router.route("/overall/:challengeId")
      .get(challengeMeController.overAll)

module.exports = router;
