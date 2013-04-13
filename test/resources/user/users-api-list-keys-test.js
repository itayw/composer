/*
 * users-api-list-keys-test.js: Tests for listing SSH keys in the RESTful users API.
 *
 * (C) 2010, Nodejitsu Inc.
 *
 */

var assert = require('assert'),
    apiEasy = require('api-easy'),
    helpers = require('../../helpers');
    
var port = 9002;

var suite = apiEasy.describe('composer/resources/user/api/list-keys').addBatch(
  helpers.macros.requireComposer(port)
);

suite.use('localhost', port)
  .setHeader('content-type', 'application/json')
  .setHeader('authorization', 'Basic WTFFFUUUU==')
  .get('/auth')
    .expect(403)
  .get('/keys')
    .expect(200)
    .expect('should respond with a list of keys', function (err, res, body) {
      var result = JSON.parse(body); 
      assert.isObject(result);
      assert.isArray(result.keys);
    })
  .next()
  .get('/users/charlie/keys')
    .expect(403)
  .get('/keys/charlie')
    .expect(200)
    .expect('should respond with all keys for the user', function (err, res, body) {
      var result = JSON.parse(body); 
      assert.isObject(result);
      assert.isArray(result.keys);
      assert.lengthOf(result.keys, 1);
    });
  
    
suite.export(module);