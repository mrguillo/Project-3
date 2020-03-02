const router = require("express").Router();
const activitiesController = require("../../controllers/activitiesController");

// Matches with "/api/books"
router.route("/create")
      .post(activitiesController.createActivity)
router.route("/approval")
      .post(activitiesController.activityApproval)
router.route("/unapproved")
      .get(activitiesController.unapproved)
router.route("/approvedinperiod/:challengeId")
      .get(activitiesController.approvedInPeriod)
router.route("/overall/:challengeId")
      .get(activitiesController.overAll)

module.exports = router;
