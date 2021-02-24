const mongoose = require('mongoose')
const mongoDBUri = process.env.MONGO_URI || 'mongodb://127.0.0.1/simpleboard';

console.log("CONNECTING TO: " + mongoDBUri);

mongoose.connect(mongoDBUri)

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'))

db.once('open', function() {
    console.log('connected to db!')
})

module.exports = db;