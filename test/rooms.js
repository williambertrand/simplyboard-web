const chai = require('chai');
const expect = chai.expect();
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('express')
const constants = require('../constants');
const testConstants = require('./testConstants')
const mongoose = require('mongoose');

const Game = require('../models/Game');
const Room = require('../models/Room');

chai.use(chaiHttp);

describe('GET /rooms/:gameId', function() {
    after(() => mongoose.disconnect());
    before(async() => {
        this.game = {
            game_id: "gameid1",
        }
        Room.find = async () => [{status: "active", display_name: "test-room"}];
        Game.findOne = async () => [{gameId: "gameid1"}];
    })
    // Successful routing of index page
    it('should render rooms list on GET /rooms', function() {
        chai.request(server).get(`/api/v1/rooms/gameId1`)
        .end(function(res, err) {
            expect(res.body.status).to.equal(200);
            console.log("BODY: ", res.body)
            expect(res.body);
        });
    });
});