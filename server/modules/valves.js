var express 	= require('express'),
	db          = require('../lib/db'),
	q 					= require("q");

var Valves = {

  getAllApplications: function(req, res){

		db.view("valves", "all", {include_docs:true}).then(function(data){
	    res.json(data);
	  }).catch(function (error) {
			console.log("[Valve] error : ");
			console.log(error);

			res.json(error);
		});
  },

	saveValve: function(req, res){
		var valve = req.body.valve;
		valve._id= "valve:"+valve.number;
		valve.type="valve";

		db.save(valve).then(function(data){
	    res.json(data);
	  }).catch(function (error) {
			console.log("[Valve] error : ");
			console.log(error);
			res.json(error);
		});
  },

	deleteValve: function(req, res){
		var id = req.params.id;
		var rev = req.params.rev;

		console.log(id);
		console.log(rev);

		db.delete(id, rev).then(function(data){
	    res.json(data);
	  }).catch(function (error) {
			console.log("[Valve] error : ");
			console.log(error);

			res.json(error);
		});

  },

	updateValve: function(req, res){

		var valve = req.body.valve;
		valve.type="valve";

		db.put(valve).then(function(data){
	    res.json(data);
	  }).catch(function (error) {
			console.log("[Valve] error : ");
			console.log(error);

			res.json(error);
		});
	},

	getValves: function(req, res){
    console.log("[Valves] listing valves");
		var params = { "include_docs":true,
									"startkey":"valve:",
								  "endkey": "valve:\ufff0"};

		db.list(params).then(function(data){
	    res.json(data);
	  }).catch(function (error) {
			console.log("[Valves] error : ");
			console.log(error);
			res.json(error);
		});
  },


};// Application



module.exports = exports = Valves;
