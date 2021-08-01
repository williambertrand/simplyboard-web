const Room = require('../models/Room');
const Game = require('../models/Game');

exports.listRoomsForGame = async function(req, res, next) {
    const { gameId } = req.params;
    const game_ref = await Game.findOne({game_id: gameId});
    const queryData = { game: game_ref._id, status: Room.RoomStatus.ACTIVE }
    const roomList = await Room.find(queryData).sort({ lastPingAt: -1 }).exec();
    const roomItems = roomList.map(item => {
        return item.toJSON.data;
    })
    res.json({
        rooms: roomItems,
        count: roomItems.length,
    });
}

exports.createRoomForGame = async function(req, res, next) {
    const { gameId } = req.params;
    const {
        display_name,
        hostIp
    } = req.body;

    const game_ref = await Game.findOne({ game_id: gameId });
    const newRoom = new Room({game: game_ref._id, display_name, host: hostIp, lastPingAt: Date() });
    await newRoom.save();

    res.json(newScore.toJSON);
}

exports.pingRoom = async function(req, res) {
    const { roomId } = req.params;
    const room_ref = await Room.findOne({ _id: roomId });
    room_ref.lastPingAt = Date();
    await room_ref.save();
    res.sendStatus(200);
}

exports.endInactiveGames = async function(req, res) {
    //TODO
}