const Score = require('../models/Score');



exports.listScoresForGame = async function(req, res, next) {
    const scoreList = await Daily.find(queryData).exec();
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