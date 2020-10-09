const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/userModel');

function initialize(passport) {
  const AuthenticateUser = (username, password, done) => {
    const user = User.getUserByUsername(username);
    if (user == null) {
      return done(null, false, { massage: 'No user with that username' });
    }
    try {
      if (user.vaildPassword(password)) {
        return done(null, user);
      } else {
        return done(null, false, { massage: 'Password incorrect' });
      }
    } catch (e) {
      return done(e);
    }
  };
  passport.use(
    new LocalStrategy({ usernameField: 'username' }, AuthenticateUser)
  );

  passport.serializeUser((user, done) => {});
  passport.deserializeUser((id, done) => {});
}

module.exports = initialize;
