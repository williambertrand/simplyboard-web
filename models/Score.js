var mongoose = require('mongoose');
const { Schema } = mongoose;

class Score {
    /* User Class methods - see loadClass below*/
    get toJSON() {
        return {
            data: {
                id: this._id,
                display_name: this.display_name,
                position: this.position,
                value: this.value
            }
        }
    }
}

const ScoreSchema = new Schema({
    display_name: String,
    value: Number,
    position: Number,
    game: { type: Schema.Types.ObjectId, ref: 'Game' },
});

ScoreSchema.loadClass(Score);
const model = mongoose.model('Score', ScoreSchema);
module.exports = model;