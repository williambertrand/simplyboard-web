const { attempt } = require('lodash');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const shortUUID = require('short-uuid');
const Game = require('../models/Game');
const User = require('../models/User');


exports.getUsersGames = async function(req, res, next) {
    const userId = req.userId;
    const user = await User.findById(userId);
    const games = await Game.find({owner: user._id}).exec();
    res.json({
        items: games.map(g => g.toJSON.data),
        count: games.length
    });
}

exports.getGame = async function(req, res, next) {
    const { id } = req.params;
    const game = await Game.findById(id);
    res.json(game.toJSON);
}

// Generate a short game_id to be used by 
const getNewGame_id = async function () {
    let exists = true;
    let attempts = 0;
    let x;
    while (exists){
        x = shortUUID.generate().substring(0,5);
        exists = await Game.exists({game_id: x});
        attempts += 1;
    }
    console.log('New game_id attempts required: ' + attempts);
    return x; 
}

exports.createGame = async function(req, res, next) {
    const { name, desc, config } = req.body;
    const owner = ObjectId(req.userId);
    const game_id = await getNewGame_id();
    console.log('creating new game for user: ' + req.userId + ' with id: ' + game_id);
    const game = new Game({name, desc, game_id, owner, config});
    await game.save();
    console.log('New game created.');
    res.json(game.toJSON.data);
}