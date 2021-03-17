const Score = require('../models/Score');
const Game = require('../models/Game');

exports.listScoresForGame = async function(req, res, next) {
    const { gameId } = req.params;
    const game_ref = await Game.findOne({game_id: gameId});
    //TODO: if game_ref.owner != req.userId throw new Error('invalid request')
    const queryData = {game: game_ref._id}
    const scoreList = await Score.find(queryData).sort({value: -1}).exec();
    const scoreItems = scoreList.map(item => {
        return item.toJSON;
    })
    res.json({
        items: scoreItems,
        count: scoreItems.length,
    });
}

exports.createScoreForGame = async function(req, res, next) {
    const { gameId } = req.params;
    const {
        display_name,
        value
    } = req.body;

    const game_ref = await Game.findOne({game_id: gameId});
    //TODO: if game_ref.owner != req.userId throw new Error('invalid request')
    const newScore = new Score({game: game_ref._id, display_name, value });
    await newScore.save();

    res.json(newScore.toJSON);
}