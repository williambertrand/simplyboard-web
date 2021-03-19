const Game = require('../models/Game');
const Stat = require('../models/Stat');
const StatItem = require('../models/StatItem');


exports.getStatsForGame = async function(req, res, next) {
    const { gameId } = req.params;
    const game_ref = await Game.findOne({game_id: gameId});

    const gameStats = await StatItem.aggregate([
        { $match: { game: game_ref._id} },
        { $group: { _id: "$key", total: { $sum: "$value" } } }
    ]).exec()

    const statsList = gameStats.map(item => {
        return {
            key: item._id,
            value: item.total,
        }
    });

    res.status(200).json({
        count: statsList.length,
        items: statsList
    });

}
exports.submitStatForGame = async function(req, res, next) {
    const { gameId } = req.params;
    const {
        key,
        value,
        op
    } = req.body;
    const game_ref = await Game.findOne({game_id: gameId});
    const newItem = new StatItem({
        game: game_ref._id,
        key, 
        value, 
        op
    })

    await newItem.save();
    res.status(200).json({message: "item saved"});
}