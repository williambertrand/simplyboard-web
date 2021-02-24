var mongoose = require('mongoose');
const { Schema } = mongoose;

class Game {
    /* User Class methods - see loadClass below*/
    get toJSON(){
        return {
            data: {
                id: this._id,
                game_id: this.game_id,
                name: this.name,
                config: this.config,
                createdAt: this.createdAt,
            }
        }
    }
}

const GameSchema = new Schema({
    name: String,
    game_id: String, //A short 6 character ID for use in urls
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now() },
    config: {
        backgroundColor: String,
        textColor: String,
        displayCount: Number
    }
});

GameSchema.loadClass(Game);
const model = mongoose.model('Game', GameSchema);
module.exports = model;