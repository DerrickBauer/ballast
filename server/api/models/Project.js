/**
 * Project
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    name : {
      type: 'string',
      required: true
    },
    securityToken: 'string'
  },

  beforeCreate: function(values, next){
    var result = "";
    for(var i = 0; i < 20; i++){
      var nextChar = Math.floor((Math.random() * 36));
      result += nextChar.toString(36);
    }
    values.securityToken = result;
    next();
  },

  beforeUpdate: function(values, next){
    delete values.securityToken;
    next();
  }

};
