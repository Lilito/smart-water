var express = require('express');
var router = express.Router();

router.use('/public', express.static('public'));

module.exports = exports = router;
