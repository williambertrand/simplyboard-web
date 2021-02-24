const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const shortUUID = require('short-uuid');

const accessTokenSecret = process.env.access_secret || 'jwt-sign-secret-2020';

const saltRounds = 12;

// Display list of all Authors.
exports.listUsers = function(req, res) {
    User.find({})
    .exec(function (err, userList) {
      if (err) { return next(err); }
      const userListData = userList.map(u => u.toJSON.data);
      res.json({'users': userListData, 'count': userListData.length});
    });
};


async function generateAccessKey() {
    let exists = true;
    let attempts = 0;
    let x;
    while (exists){
        x = shortUUID.generate().substring(0,10);
        exists = await User.exists({accessKey: x});
        attempts += 1;
    }
    return x; 
}

exports.createUser = async function(req, res, next) {

    const {
        name,
        email,
        username,
        password
    } = req.body;

    const hashed = await bcrypt.hash(password, saltRounds);
    const keey = await generateAccessKey();
    const userData = {
        name: name,
        username: username,
        email: email,
        password: hashed,
        accountType: 'basic',
        accessKey: keey,
    }

    const newUser = new User(userData);
    await newUser.save();

    if (newUser) {
        const accessToken = jwt.sign({ userId: String(newUser._id) }, accessTokenSecret);
        //Succes!
        res.json({token: accessToken, user: newUser.toJSON.data});
    }
    else {
        res.sendStatus(400);
    }
}


exports.checkLogin = async function(req, res) {
    const {
        email,
        password
    } = req.body;

    const userFilter = {'email': email};
    const user = await User.findOne(userFilter).exec();
    const match = await bcrypt.compare(password, user.password);

    if(match) {
        const accessToken = jwt.sign({ userId: String(user._id) }, accessTokenSecret);
        //Succes!
        res.json({token: accessToken, user: user.toJSON.data});
    } else {
        res.sendStatus(401);
    }
}


exports.userInfo = async function(req, res) {
    const userId = req.userId;
    if (!userId) {
        res.sendStatus(401);
        return;
    }

    const user = await User.findById(userId).exec();
    res.json(user.toJSON.data);
}