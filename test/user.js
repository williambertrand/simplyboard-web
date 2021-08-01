const User = require('../models/User');
const assert = require('assert');
var mongoose = require('mongoose');

const { test_email, test_email2 } = require('./testConstants');

class ResTestHelper {

    constructor() {
        this.status = 0;
        this.data = {}
    }
    
    sendStatus(status) {
        this.status = status;
    }

    json(data) {
        this.data = data;
    }
}

describe('User Controller', function() {

    after(async function() {
        //await User.deleteMany({email: test_email2}).exec();
        mongoose.disconnect();
    })

    it('TEMP: Should create user', async () => {
        const test_user_create = {
            email: test_email2,
            username: 'test-user-3122',
            name: 'user',
            password: 'password',
            inviteCode: 'invite-test'
        }
        assert(test_user_create);
    });

})