'use strict';

var request = require('request');

// log severities
var DEBUG = "debug";
var ERROR = "error";

/**
 * Create an Echo client
 *
 * @param {object} config Echo Client config
 * @constructor
 */
var EchoClient = function(config){
  this.config = config || {};

  var requiredParams = ['echo_host', 'echo_port'];

  for(var i in requiredParams){
    if (this.config[requiredParams[i]] === undefined) {
      throw new Error("Missing Echo config: "+requiredParams[i]);
    }
  }
};

/**
 * Log wrapping functions
 *
 * @param severity ( debug or error )
 * @param message
 * @returns {boolean}
 * @private
 */
EchoClient.prototype._log = function (severity, message) {
  if (!this.config.enable_debug) {
    return true;
  }

  if (this.config.logger) {
    if (severity === DEBUG) {
      this.config.logger.debug("[echo_node_client] " + message);
    } else if (severity === ERROR) {
      this.config.logger.error("[echo_node_client] " + message);
    } else {
      console.log(severity + ": [echo_node_client] " + message);
    }
  } else {
    console.log(severity + ": [echo_node_client] " + message);
  }
};

EchoClient.prototype.debug = function (message) {
  this._log(DEBUG, message);
};
EchoClient.prototype.error = function (message) {
  this._log(ERROR, message);
};

/**
 * The only way to get an instance of the Echo Client is through this method
 * @param config
 * @returns {EchoClient}
 */
exports.createClient = function (config) {
  return new EchoClient(config);
};