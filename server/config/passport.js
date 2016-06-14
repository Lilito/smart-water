var express 		= require('express'),
  	passport 		= require('passport'),
  	router 			= express.Router(),
    User = require('../modules/user.js'),
  	middleware 		= require('../lib/middleware.js')(passport),
    LocalStrategy = require('passport-local').Strategy;



// =========================================================================
// passport session setup
// =========================================================================
// required for persistent login sessions
// passport needs ability to serialize and unserialize users out of session

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
	done(null, {email:user.email});
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
	done(null, obj);
});

// =========================================================================
// LDAP
// =========================================================================
passport.use( new LocalStrategy(
  function(username, password, done) {
    var user={};
    User.getUser(username).then(function(data){
      if(data){

        if(data.body.password===password){
          user.username=username;
          user.role= data.body.role;
          user.hasAccess=true;
          	console.info("[INFO] Received valid login for "+ username);
        }
      }
      process.nextTick(function () {
        return done(null, user);
      });

});



	})
);



module.exports = passport = router;
