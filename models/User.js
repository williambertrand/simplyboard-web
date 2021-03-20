var mongoose = require('mongoose');
const { Schema } = mongoose;

class User {
    /* User Class methods - see loadClass below*/
    get toJSON(){
        return {
            data: {
                id: this._id,
                email: this.email,
                name: this.name,
                type: this.accountType,
                trialEndDate: this.trialEndDate,
                createdAt: this.createdAt, 
                accessKey: this.accessKey,
            }
        }
    }
}

const UserSchema = new Schema({
    name: String,
    email: {type: Schema.Types.String, unique: true},
    password: Object,
    accessKey: {type: Schema.Types.String, unique: true, required: true},
    accountType: {type: Schema.Types.String, required: true},
    createdAt: {type: Date, default: Date.now},
    trialStart: {type: Date, default: Date.now},
    trialEndDate: {type: Date, default: Date.now},
    isOnWaitList: Boolean,
});

UserSchema.loadClass(User);
const model = mongoose.model('User', UserSchema);


// Keys: slb_
model.loadFromKeys = async function(keys) {
    const { slb_access, slb_secret } = keys;
    const user = await model.findOne({ accessKey: slb_access }).exec();
    return user._id;
}

module.exports = model;