var config = require("../config/private.json"); // SAME AS PUBLIC JUST WITHOUT SECRET STUFF
const functions = require('../functions.js');
 

module.exports = {
    name: "subscribe",
    description: "Subscribe to a day, where a channel will be created for your group.",
    syntax: config.prefix + "subscribe <dag> || dag kan fx være mandag.",
    run: async (client, message, args) => {
        
        const msg = await message.channel.send(`Subscribing....`);
        const acceptedDays = {"monday" : "1", "tuesday" : "2", "wednesday" : "3", "thursday" : "4", "friday" : "5"}
        var continueProgram = true;
        for (i in config.subscribePermissions) if(message.member.hasPermission(i)) {
            if(args.length != 1) {
                msg.edit(module.exports.syntax);
                break;
            } else {
                if (!(args[0] in acceptedDays)) {
                    msg.edit("Thay day isn't an accepted day. Try again with another day fx monday.")
                    continueProgram = false;
                }
                if (continueProgram) {
                    var member = message.member;
                    var database = new functions.Database("./" + config.database);
                    database.querySQL("SELECT * FROM subscriptions", function(rows) {
                    rows.forEach((row) => {
                        if(member.id == row.userId) {
                            database.updateSubscription(acceptedDays[args[0]], member.user.id, member.user.tag)
                            continueProgram = false;
                            msg.edit("Since you already was in the database, I've just updated it for you. :)");
                        }
                    })
                    if(continueProgram) {
                        database.addSubscription(acceptedDays[args[0]], member.user.id, member.user.tag);
                    } 
                });
                break;
                }
            }
        } else {
            msg.edit(config.permissionMessage);
        }
    }
} 