const moment = require('moment');
const Room = require('../models/Room');
const Game = require('../models/Game');
const User = require('../models/User');

const { getNewGame_id } = require("../controllers/gameController");

const CreateUser = async (email, accountType) => {

    const userData = {
        name: 'User Name',
        username: 'username',
        email: email,
        password: 'hashed-pass',
        accountType: accountType,
        accessKey: 'access-key',
        trialEndDate: moment(),
        isOnWaitList: false
    }

    const u = new User(userData);
    console.log("new user: ", u)
    await u.save();
    console.log("new user saved!")
    return u;
}

const CreateGame = async (user) => {
    const game_id = await getNewGame_id();
    const g = new Game({
        name: 'Game1',
        desc: 'Game1 Desc',
        owner: user._id,
        config: {
            backgroundColor: '#fff',
            textColor: '#c0ffee',
            displayCount: 12,
        },
        game_id,
    });
    await g.save();
    return g;
}

const CreateRoom = async (game, status='active') => {
    const r = new Room({
        display_name: 'Test Room',
        game: game._id,
        host: '127.00.01',
        lastPingAt: new Date(),
        status,
    })
    await r.save;
    return r;
}

module.exports = {
    CreateUser,
    CreateGame,
    CreateRoom
}