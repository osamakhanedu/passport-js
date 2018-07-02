

/**
 * User is a model 
 * bcrypt is use to hash the password
 * passport local strategy is used 
 */


const passport = require('passport')
const LocalStrategy = require('./local-strategy');
const User  = require('../models').user;

passport.serializeUser(function (user, done) {
  console.log('serialize');
  done(null, {id :user.id});
});

passport.deserializeUser(function (user, done) {
  console.log('deserialize user', user);

  User.findById(user.id)
  .then(response=>{ 
      done(null,response.dataValues);
  })
  .catch(error=>{ 
    console.log(error); 
  })

 // done(null, user);
});

//  Use Strategies 
passport.use(LocalStrategy)

module.exports = passport