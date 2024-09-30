const passport = require("passport");
const Models = require("../models");
const LocalStrategy = require("passport-local");
const GoogleOauthTokenStrategy = require("passport-google-oauth-token");
const FacebookTokenStrategy = require("passport-facebook-token");
const {
  isPasswordValid,
  generateToken,
  verifyToken,
  hashPassword,
} = require("../helpers/utils");
const { findOrCreate } = require("../controllers/users");
const jwt = require("jsonwebtoken");

module.exports = () => {
  passport.use(
    new LocalStrategy(async (username, pwd, done) => {
      try {
        const user = await Models.User.findOne({ where: { email: username } });
        if (!user) {
          return done(null, false);
        }
        const validPassword = await isPasswordValid(pwd, user.password);
        if (!validPassword) return done(null, false);
        const userToken = generateToken(user);
        const { password, ...otherInfo } = user.dataValues;
        return done(null, {
          token: userToken,
          user_info: otherInfo,
        });
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.use(
    new GoogleOauthTokenStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      },
      async function (accessToken, refreshToken, profile, cb) {
        const user = {
          name: profile.displayName,
          email: profile.emails[0].value,
          provider: "google",
        };
        const userDetails = await findOrCreate(user);
        cb(userDetails.err, userDetails.data);
      }
    )
  );

  passport.use(
    new FacebookTokenStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        fbGraphVersion: "v3.0",
      },
      async function (accessToken, refreshToken, profile, cb) {
        const user = {
          name: profile.displayName,
          email: profile.email,
          provider: "facebook",
        };
        const userDetails = await findOrCreate(user);
        cb(userDetails.err, userDetails.data);
      }
    )
  );
};

module.exports.isAuthenticated = (req, res, next) => {
  try {
    if (req.headers["authorization"]) {
      const bearerToken = req.headers["authorization"];
      const token = bearerToken.split(" ")[1];
      const userDetails = verifyToken(token);
      if (token) {
        req.user_details = userDetails;
        next();
      }
    } else {
      res
        .status(401)
        .send({ message: "Authentication failed please provide valid token" });
    }
  } catch (err) {
    res
      .status(401)
      .send({ message: "Authentication failed please provide valid token" });
  }
};

module.exports.isAuthorized = (req, res, next) => {};
