var mongoose = require('mongoose');
const { Schema } = mongoose;


const StatItemSchema = new Schema({
    key: String,
    value: Number,
    op: String,
    game: { type: Schema.Types.ObjectId, ref: 'Game' },
    createdAt: { type: Date, default: Date.now() },
});

const model = mongoose.model('StatItem', StatItemSchema);
module.exports = model;