var sqlite3 = require('sqlite3').verbose();

class Database {
    constructor(location="") {
        this.location = location;
        this.db = new sqlite3.Database(location);
    }
    async querySQL(cmd, callback){
        this.db.all(cmd, function(err, rows) {
            if(err) {
                console.log(err);
                return;
            }
            //console.log(typeof rows)
            callback(rows)
        })
    }

    addSubscription(day, userid, tag) {
        this.db.all(`INSERT INTO subscriptions (discordName, userId, day) VALUES (${tag}, ${userid}, ${day})`);
    }
    updateSubscription(day, userid, tag) {
        this.db.all(`UPDATE subscriptions SET discordName = '${tag}', day = '${day}' WHERE userId = '${userid}'`);
    }
    closeConnection() {

    }

}

module.exports = { 
    Database
}