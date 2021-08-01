var app = require('../app');
var mongoose = require('mongoose');

const assert = require('assert');

describe('APP', function() {
  after(() => mongoose.disconnect());
  it('Should exist', function(){
    assert(app);
  })
})