const chai = require('chai');
const expect = chai.expect();
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('express')
const constants = require('../constants');
var mongoose = require('mongoose');

chai.use(chaiHttp);

describe('Index', function() {
    after(() => mongoose.disconnect());
    // Successful routing of index page
    it('should render the index on /', function() {
        chai.request(server).get('/')
        .end(function(res, err) {
            expect(res.body.status).to.equal(200);
            expect(res.body).to.contain(constants.APP_TITLE);
        });
    });

    // Unsuccessful routing 
    it('should render 404 /missing', function() {
        chai.request(server).get('/missing')
        .end(function(res, err) {
            expect(res.body.status).to.equal(404);
        });
    });

});