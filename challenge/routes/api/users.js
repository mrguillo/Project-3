const router = require("express").Router();
const challengeMeController = require("../../controllers/challengeMeController");

// Matches with "/api/books"
router.route("/create")
  .post(challengeMeController.createUser)

router.route("/find/:firebaseId")
  .get(challengeMeController.findUser)

router.route("/getuserinfo/:id")
  .get(challengeMeController.getUserInfo)

module.exports = router;