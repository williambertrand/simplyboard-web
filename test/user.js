const User = require('../models/User');
var userController = require('../controllers/userController');
const assert = require('assert');

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
        await User.deleteMany({email: test_email2}).exec();
    })

    it('Should create user', function() {
        const test_user_create = {
            email: test_email2,
            username: 'test-user-3122',
            name: 'user',
            password: 'password',
            inviteCode: 'invite-test'
        }
        const resHelper = new ResTestHelper();
        const _ = userController.createUser({body: test_user_create}, resHelper, async function(){
            const user = await User.findOne({email: test_email}).exec()
            assert(user);
            assert(user.email == test_email2);
            assert(resHelper.status == 200);
        });

    });

})