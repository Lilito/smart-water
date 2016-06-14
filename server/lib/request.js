var q           = require("q"),
    request     = require('request');

var Request = {

  get: function(url , options){
    var deferred = q.defer();
    console.info("[Request][post] "+ url);
    request.get(url , options,
      function (error, response, body) {
         deferred.resolve({"error": error, "response": response, "body": body});
      }
    );
    return deferred.promise;
  },
  post: function(url , options){
		var deferred = q.defer();
    //console.info("[Request][post] "+ url);
    request.post(url , options,
   		function (error, response, body) {
   		   deferred.resolve({"error": error, "response": response, "body": body});
   		}
    );
	  return deferred.promise;
	},

	put: function(url , options){
		var deferred = q.defer();
    //console.info("[Request][put] url: " + url);
    request.put(url , options,
   		function (error, response, body) {
   		   deferred.resolve({"error": error, "response": response, "body": body});
   		}
    );
	  return deferred.promise;
	},

  delete: function(url , options){
		var deferred = q.defer();
		//console.info("[Request][delete] url: " + url);
    request.del(url , options,
   		function (error, response, body) {
   		   deferred.resolve({"error": error, "response": response, "body": body});
   		}
    );
	  return deferred.promise;
	},

};

module.exports = exports = Request;
