const User = require("../models/users");

module.exports.signup = (req, res) => {
  res.render("user/signup");
};

module.exports.userRegister = async (req, res, next) => {
  try {
    const {
      name,
      email,
      village,
      city,
      country,
      area,
      areaUnit,
      phone,
      password,
      confirmPassword,
    } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
      req.flash("error", "Passwords do not match!");
      return res.redirect("/user/signup");
    }

    const newUser = new User({
      name,
      email,
      village,
      city,
      country,
      area,
      areaUnit,
      phone,
    });

    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }

      req.flash("success", "Welcome to Krishi Sarthi 🌱");
      res.redirect("/");
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/user/signup");
  }
};

module.exports.login = async (req, res) => {
  const redirectUrl = res.locals.redirectUrl || "/";

  req.flash(
    "success",
    `Welcome back, ${req.user.name}! 🌱 You are now logged in to Krishi Sarthi.`,
  );

  res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    req.flash(
      "success",
      "Thank you for using Krishi Sarthi! 🌾 You have been logged out successfully.",
    );

    res.redirect("/");
  });
};
