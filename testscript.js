/*const sqlite3 = require('sqlite3');
//var db = new sqlite3.Database("../subscribtions.db");
var db = new sqlite3.Database("./subscribtions.db");

db.all("SELECT * FROM subscribtions", function(err, rows) {
    console.log(rows)
    console.log(err)    
    //rows.foreach(function (row) {
        //    console.log(row);
        //})
	});	
db.close();*/

var config = require("./config/private.json"); // SAME AS PUBLIC JUST WITHOUT SECRET STUFF
const functions = require('./functions.js');

var member = {
    name : "Marcus#4055",
    id : "297044132252090368",
    day : "tuesday"
}

var database = new functions.Database("./" + config.database);
database.querySQL("SELECT * FROM subscriptions", function(rows) {
    var updatedDatabase = false;
    rows.forEach((row) => {
        if(row.userId === member.id) {
            console.log(member);
            database.updateSubscription(member.name, member.day, member.name);
            updatedDatabase = true;
            break;
        }
    }) 
    if(!updatedDatabase) {
        database.addSubscription(member.name, member.day, member.name);
    }
});