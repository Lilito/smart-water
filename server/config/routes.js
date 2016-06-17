var express 		= require('express'),
  	passport 		= require('passport'),
  	router 			= express.Router(),
    Valve = require('../modules/valves'),
    User = require('../modules/user'),
  	middleware 	= require('../lib/middleware.js')(passport);

//***************************************************
// home

router.get('/',  function(req, res) {
	res.sendfile('public/index.html');
});
router.get('/home',  middleware.ensureAuthenticated, function(req, res){
	res.redirect('/#/home');
});

//***************************************************
// auth && login
router.get('/login', function(req, res) {
	res.redirect('/#/login/');
});

router.get('/api/auth/session', middleware.ensureAuthenticatedAPI, function(req, res){
  if(req.session.isAuthenticated){
    res.json({ status: 200 });
  }else{
    res.json({ status: 401 });
  }
});

router.post('/api/auth/login',middleware.urlEncodedParser,middleware.passport.authenticate('local'),function (req,res){
  console.log(req.user);
  if(req.user.hasAccess) {
      req.session.user = req.user;
      req.session.isAuthenticated = true;
      res.json(req.user);
      console.info("[routes][login] - roles :" + req.user.roles);

    } else {
      req.logout();
      req.session.user = null;
      req.session.isAuthenticated = null;
      res.json(req.user);
      console.info("[routes][login] - Access Denied");

    }
});

router.get('/logout', function(req, res) {
	req.logout();
	req.session.user = null;
	req.session.isAuthenticated = null;
	res.redirect('/#/logout');
});


router.get('/api/valves', middleware.ensureAuthenticatedAPI, Valve.getValves);
router.post('/api/valves', middleware.ensureAuthenticatedAPI, Valve.saveValve);
router.delete('/api/valves/:id/:rev/:type/:deviceid', middleware.ensureAuthenticatedAPI, Valve.deleteValve);


router.get('/api/user',middleware.ensureAuthenticatedAPI, User.getUsers);
router.post('/api/user', middleware.ensureAuthenticatedAPI, User.saveUser);
router.delete('/api/user/:id/:rev', middleware.ensureAuthenticatedAPI, User.deleteUser);
router.put('/api/user',middleware.ensureAuthenticatedAPI,  User.updateUser);
router.get('/api/user/:user', User.getUser);

router.get('/api/dumpValves', middleware.ensureAuthenticatedAPI, Valve.dumpAllValves);

module.exports = exports = router;
