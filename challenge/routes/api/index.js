const router = require("express").Router();
const challengeRoutes = require("./challenges");
const usersRoutes = require("./users");

// Book routes
router.use("/challenges", challengeRoutes);
router.use("/users", usersRoutes);

module.exports = router;
