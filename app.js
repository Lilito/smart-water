var express 	= require('express'),
		app     		= express(),
		cookieParse = require('cookie-parser'),
		session 		= require('express-session'),
		passport 		= require('passport');

// init passport
console.info("[app] init passport ");
app.use(passport.initialize());
app.use(passport.session());

// init session
console.info("[app] init session ");
app.use(session({
    secret: "smart-water",
    name: "session",
    resave: false,
    saveUninitialized: false
}));

// static
console.info("[app] init basics for an express app ");
app.use(express.static(__dirname + '/public'));

// init database
console.log("[app] init database");
require('./server/lib/db').connect("smartwater");
require('./server/lib/ibmiot').connect();
// init config
console.log("[app] init config ");
app.use(require('./server/config/passport'));
app.use(require('./server/config/setup'));
app.use(require('./server/config/staticfile'));
app.use(require('./server/config/routes'));

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  console.log('[app] Express server listening on port ' + server.address().port);
});
