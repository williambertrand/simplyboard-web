var mongoose = require('mongoose');
const { Schema } = mongoose;

const RoomStatus = {
    ACTIVE: 'active',
    ENDED: 'ended'
}

class Room {
    /* User Class methods - see loadClass below*/
    get toJSON() {
        return {
            data: {
                id: this._id,
                display_name: this.display_name,
                game: this.game._id,
                host: this.host,
                port: this.port,
                lastPingAt: this.lastPingAt,
                status: this.status,
            }
        }
    }
}

const RoomSchema = new Schema({
    display_name: String,
    game: { type: Schema.Types.ObjectId, ref: 'Game' },
    host: String,
    port: String,
    lastPingAt: Date,
    status: {
        type: String,
        enum : Object.values(RoomStatus),
        default: RoomStatus.ACTIVE,
    },
});

RoomSchema.loadClass(Room);
const model = mongoose.model('Room', RoomSchema);
model.RoomStatus = RoomStatus;
module.exports = model;