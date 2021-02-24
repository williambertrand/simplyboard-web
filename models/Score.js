var mongoose = require('mongoose');
const { Schema } = mongoose;

class Score {
    /* User Class methods - see loadClass below*/
    get toJSON() {
        return {
            data: {
                id: this._id,
                name: this.name,
                value: this.value
            }
        }
    }
}

const ScoreSchema = new Schema({
    name: String,
    value: Number,
    game: { type: Schema.Types.ObjectId, ref: 'Game' },
});

ScoreSchema.loadClass(Score);
const model = mongoose.model('Score', ScoreSchema);
module.exports = model;