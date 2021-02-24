class ResTestHelper {

    constructor() {
        this.status = 0;
        this.data = {}
    }
    
    sendStatus(status) {
        this.status = status;
    }

    json(d){
        this.data = d;
    }


}

module.exports = ResTestHelper;