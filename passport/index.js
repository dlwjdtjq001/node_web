const passport = require('passport');
const local = require('./local');
const User = require('../models/user');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id); //쿠키에 전달하고싶은 키값
  });

  passport.deserializeUser((id, done) => { //passport.session 미들웨어가 호출
    User.findOne({
      where: { id }
    })
    .then(user => done(null, user))
    .catch(err => done(err));
  });

  local();
};