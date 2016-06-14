var router = require('express').Router();
var bodyParser = require('body-parser');

router.use(bodyParser.json({
  limit: '5mb'
}));
router.use(bodyParser.urlencoded({
  limit: '5mb',
  extended: true
}));



// log all requests
router.all('*', function(req, res, next){
	console.info("[setup] Received request to " + req.url);
	next();
});

module.exports = exports = router;
