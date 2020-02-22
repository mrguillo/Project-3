const router = require("express").Router();
const challengeRoutes = require("./challenges");
const usersRoutes = require("./users");
const activitiesRoutes = require("./activities")

// Book routes
router.use("/challenges", challengeRoutes);
router.use("/users", usersRoutes);
router.use("/activities",activitiesRoutes)

module.exports = router;
