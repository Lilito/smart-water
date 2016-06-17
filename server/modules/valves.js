var express 	= require('express'),
	db          = require('../lib/db'),
	iot          = require('../lib/ibmiot'),
	q 					= require("q");

var Valves = {

  dumpAllValves: function(req, res){
		iot.getAllDevicesTypes().then(function (data) {
			var types= data.body.results;
			var all_devices=[];
			if(types){
				types.forEach(function(type){
					iot.getAllDevicesbyType(type.id).then(function (result) {
						var devices=result.body.results;
						devices.forEach(function (device) {
							all_devices.push(device);
							Valves.createValve(device);
						});
					});
				});
				res.json(all_devices);
			}

		}).catch(function (error) {
			console.log("[Valve] error dumpValves : " + error.error.reason);
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

	createValve: function(valve){
		valve._id= "valve:"+valve.clientId;
		valve.type="valve";
		db.save(valve).then(function(data){
	    console.log("Saved");
	  }).catch(function (error) {
			console.log("[Valve] error : "+ error.error.reason);
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
									"startkey":"valve:d:",
								  "endkey": "valve:d:\ufff0"};

		db.list(params).then(function(data){
	    res.json(data);
	  }).catch(function (error) {
			console.log("[Valves] error : ");
			console.log(error);
			res.json(error);
		});
  },

	getHistoryValve: function (req, res) {
		console.log("[Valves] historyValve");
		var valve={};
		valve._id=req.params.id;
	}


};// Application



module.exports = exports = Valves;
