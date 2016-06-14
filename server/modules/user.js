var express 	= require('express'),
	db          = require('../lib/db'),
	q 					= require("q");

var User = {

  getAllUsers: function(req, res){

		db.view("users", "all", {include_docs:true}).then(function(data){
	    res.json(data);
	  }).catch(function (error) {
			console.log("[User] error : ");
			console.log(error);

			res.json(error);
		});
  },

	saveUser: function(req, res){
		var user = req.body.user;
		user._id= "user:"+user.user.toLowerCase();
		user.role=user.role;
		user.type="user";



		db.save(user).then(function(data){
	    res.json(data);
	  }).catch(function (error) {
			console.log("[User] error : ");
			console.log(error);
			res.json(error);
		});
  },

	deleteUser: function(req, res){
		var id = req.params.id;
		var rev = req.params.rev;

		console.log("[User] delete user id: " + id);
		console.log("rev: " + rev);

		db.delete(id, rev).then(function(data){
	    res.json(data);
	  }).catch(function (error) {
			console.log("[User] error : ");
			console.log(error);

			res.json(error);
		});

  },

	updateUser: function(req, res){

		var user = req.body.user;
		user.role="user";

		db.put(user).then(function(data){
	    res.json(data);
	  }).catch(function (error) {
			console.log("[User] error : ");
			console.log(error);

			res.json(error);
		});
	},

	getUser: function(username){
		
			var deferred = q.defer();
		var user = {};
		user._id= "user:"+username;

		db.get(user._id, []).then(function(data){
	    deferred.resolve(data);
	  }).catch(function (error) {
			console.log("[User] error : ");
			console.log(error);
			deferred.reject(error);
		});
		return deferred.promise;
  },

  getUsers: function(req, res){
    console.log("[User] listing users");
		var params = { "include_docs":true,
									"startkey":"user:",
								  "endkey": "user:\ufff0"};

		db.list(params).then(function(data){
	    res.json(data);
	  }).catch(function (error) {
			console.log("[User] error : ");
			console.log(error);
			res.json(error);
		});
  },

};// Exam



module.exports = exports = User;
