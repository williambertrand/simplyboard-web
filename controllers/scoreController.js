const Score = require('../models/Score');
const Game = require('../models/Game');



exports.listScoresForGame = async function(req, res, next) {
    const { gameId } = req.params;
    const game_ref = await Game.findOne({game_id: gameId});
    const queryData = {game_id: game_ref._id}
    const scoreList = await Score.find(queryData).exec();
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
    const newScore = new Score({game_id: game_ref._id, display_name, value });
    await newScore.save();

    res.json(newScore.toJSON);
}