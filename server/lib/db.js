var q  = require("q");
var bluemix  = require("./bluemix");

var cloudant, dbCredentials = {};

var DB = {

  db: {},

  database: "",

  save: function(object) {
    console.log("[db] save");
    var deferred = q.defer();
  	this.db.insert(object, '', function(err, doc) {
  		if(err) {
        deferred.reject({"status": 500, "body": {}, "error": err});
  		} else{
        deferred.resolve({"status": 200, "body": object});
      }
  	});
    return deferred.promise;
  },

  put: function(object) {
    console.log("[db] put");
    var deferred = q.defer();
    this.db.insert(object,object._id, function(err, doc) {
      if(err) {
        deferred.reject({"status": 500, "body": {}, "error": err});
      } else{
        deferred.resolve({"status": 200, "body": object});
      }
    });
    return deferred.promise;
  },

  delete: function(id, rev) {
    console.log("[db] delete");
    var deferred = q.defer();
  	this.db.destroy(id,rev, function(err, doc) {
  		if(err) {
        deferred.reject({"status": 500, "error": err});
  		} else{
        deferred.resolve({"status": 200});
      }
  	});
    return deferred.promise;
  },

  find: function(object){
    console.log("[db] find");
    var deferred = q.defer();
    this.db.get(object, function(error, result) {
      if (error) {
        deferred.reject({"status": 500, "body": {}, "error": error});
      }
      deferred.resolve({"status": 200, "body": result});
    });
    return deferred.promise;
  },

  view: function(designname, viewname, params){
    console.log("[db] view: ");
    var deferred = q.defer();
    this.db.view(designname, viewname, params, function(error, result) {
      if (error) {
        deferred.reject({"status": 500, "body": {}, "error": error});
      }
      deferred.resolve({"status": 200, "body": result});
    });
    return deferred.promise;
  },

  search: function(designname, viewname, params){
    console.log("[db] search: ");
    var deferred = q.defer();
    this.db.search(designname, viewname, params, function(error, result) {
      if (error) {
        deferred.reject({"status": 500, "body": {}, "error": error});
      }
      deferred.resolve({"status": 200, "body": result});
    });
    return deferred.promise;
  },

  list: function(params){
    console.log("[db] list: ");
    var deferred = q.defer();
    this.db.list(params,function(error, result) {
      if (error) {
        deferred.reject({"status": 500, "body": {}, "error": error});
      }
      deferred.resolve({"status": 200, "body": result});
    });
    return deferred.promise;
  },

  get: function(id, params){
    console.log("[db] get: " + id + " " + params);
    var deferred = q.defer();
    this.db.get(id, params, function(error, result) {
      if (error) {
          console.log("Error");
        deferred.reject({"status": 500, "body": {}, "error": error});
      }
      deferred.resolve({"status": 200, "body": result});
    });
    return deferred.promise;
  },

  connect: function(database){
    //console.log("[db] connecting to cloudant: "+database);
    this.database = database;
    var isValidDatabase = false;
    var service = bluemix.getService('cloudantNoSQLDB');

    if(service.credentials){
      dbCredentials.host = service.credentials.host;
      dbCredentials.port = service.credentials.port;
      dbCredentials.user = service.credentials.username;
      dbCredentials.password = service.credentials.password;
      dbCredentials.url = service.credentials.url;

      isValidDatabase = true;
    }

    if(isValidDatabase){
      cloudant = require('cloudant')(dbCredentials.url);
      cloudant.db.get(database, function (err, res) {
        console.log("[db] connecting to cloudant: "+database);
        if (err) {
          console.log('[db] creating new database ', database);
          cloudant.db.create(database, function (err, res) {
            if (err) {
              console.error('[db] could not create db ', err);
            }
          });
        }
        else {
          console.log("[db] Connect success");
        }
      }),

      this.db = cloudant.use(database);
      status = "connected";
    }
	}

};

module.exports = exports = DB;
