const router = require("express").Router();
const userController = require("../../controllers/userController")

// Matches with "/api/books"
router.route("/create")
      .post(userController.createUser)
router.route("/find/:firebaseId")
      .get(userController.findUser)
router.route("/getuserinfo/:id")
      .get(userController.getUserInfo)

module.exports = router;