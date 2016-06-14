'use strict';

var fs = require('fs');

module.exports.getService = function(name) {
    var services = {};
    if (process.env.VCAP_SERVICES) {
      services = JSON.parse(process.env.VCAP_SERVICES);
    }else{
    	services = JSON.parse(fs.readFileSync('server/config/VCAP_SERVICES.json', 'utf8'));
    }

    for (var service_name in services) {
      if (service_name.indexOf(name) === 0) {
        var service = services[service_name][0];
        return service;
      }
    }
    return {};
};
