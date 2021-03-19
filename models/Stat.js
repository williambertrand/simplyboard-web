var mongoose = require('mongoose');
const { Schema } = mongoose;

class Stat {
    /* User Class methods - see loadClass below*/
    get toJSON(){
        return {
            data: {
                id: this._id,
                game_id: this.game_id,
                name: this.name,
                value: this.value,
                config: this.config,
                createdAt: this.createdAt,
            }
        }
    }
}

const StatSchema = new Schema({
    name: String,
    value: Number,
    game: { type: Schema.Types.ObjectId, ref: 'Game' },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now() },
});

StatSchema.loadClass(Stat);
const model = mongoose.model('Stat', StatSchema);
module.exports = model;