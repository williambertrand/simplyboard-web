const mongoose = require('mongoose')
const mongoDBUri = process.env.MONGO_URI || 'mongodb://127.0.0.1/simpleboard';


if (process.env.NODE_ENV === 'test') {
    const cleanDatabase = () => {
        console.log("Cleaning test DB");
        return mongoose.connection.db.dropDatabase()
    }
    mongoose.connect(`${mongoDBUri}-test`)
    const testDb = mongoose.connection;
    testDb.once('open', function() {
        console.log('connected to TEST db!')
        // cleanDatabase();
    })
    
} else {
    console.log("CONNECTING TO: " + mongoDBUri);
    mongoose.connect(mongoDBUri)
}

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'))

db.once('open', function() {
    console.log('connected to db!')
})

module.exports = db;