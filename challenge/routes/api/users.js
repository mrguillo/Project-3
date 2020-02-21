const router = require("express").Router();
const challengeMeController = require("../../controllers/challengeMeController");

// Matches with "/api/books"
router.route("/create")
  .post(challengeMeController.createUser)

router.route("/find")
  .get(challengeMeController.findUser)

module.exports = router;