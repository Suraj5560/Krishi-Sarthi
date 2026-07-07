const express = require("express");
const router = express.Router();

const passport = require("passport");
const { register } = require("node:module");

const userController = require("../controllers/users");


router
  .route("/signup")
  .get(userController.signup)
  .post(userController.userRegister);

router
  .route("/login")
  .get((req, res) => {
    res.render("user/login");
  })
  .post(
    passport.authenticate("local", {
      failureRedirect: "/user/login",
      failureFlash: true,
    }),
    userController.login,
  );

router.get("/logout", userController.logout);

module.exports = router;
