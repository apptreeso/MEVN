const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const key = require("../../config/keys").secret;
const User = require("../../model/User");

router.post("/register", async (req, res) => {
  let { name, username, email, password, confirm_password } = req.body;

  if (password !== confirm_password) {
    return res.status(400).json({
      msg: "Password doesn't match"
    });
  }

  let user = await User.findOne({ username: username });
  if (user) {
    return res.status(400).json({
      msg: "Username already exists"
    });
  }

  user = await User.findOne({ email: email });
  if (user) {
    return res.status(400).json({
      msg: "Email already exists"
    });
  }

  let newUser = new User({
    name,
    username,
    password,
    email
  });
  console.log(newUser);
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save().then(user => {
        return res.status(201).json({
          success: true,
          msg: "Hurry! User is now registered."
        });
      });
    });
  });
});
302;
router.post("/login", (req, res) => {
  User.findOne({ username: req.body.username }).then(user => {
    if (!user) {
      return res.status(404).json({
        msg: "Username is not found",
        success: false
      });
    }

    bcrypt.compare(req.body.password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          _id: user._id,
          username: user.username,
          name: user.name,
          email: user.email
        };
        jwt.sign(payload, key, { expiresIn: 604800 }, (err, token) => {
          res.status(200).json({
            success: true,
            user: user,
            token: `Bearer ${token}`,
            msg: " You're logged in"
          });
        });
      } else {
        return res.status(404).json({
          msg: "Incorrect password",
          success: false
        });
      }
    });
  });
});

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.json(req.user);
  }
);

module.exports = router;
