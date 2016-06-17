var express 	= require('express'),
	db          = require('../lib/db'),
	iot          = require('../lib/ibmiot'),
	q 					= require("q"),
	randtoken = require('rand-token');

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
		var type = req.body.type;
		var deviceId = req.body.deviceId;
		var authToken = randtoken.generate(16);
		var metadata = {};
		var deviceInfo = req.body.deviceInfo;
		var location = req.body.location;

		iot.registerDevice(type, deviceId, authToken, deviceInfo, location, metadata).then(function (result) {
			console.log(result.body);
			var device=result.body;
			Valves.createValve(device);
		}).catch(function (error) {
			console.log("[Valve] error registerDevice : ");
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
		var type=req.params.type;
		var deviceId= req.params.deviceid;

		iot.deleteDevice(type, deviceId).then(function (response) {
			db.delete(id, rev).then(function(data){
				res.json(data);
			}).catch(function (error) {
				console.log("[Valve] error deleting valve : ");
				console.log(error);
				res.json(error);
			});
		}).catch(function (err) {
			console.log("[Valve] error deletingDevice : ");
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
