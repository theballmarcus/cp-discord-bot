const Discord = require('discord.js');
const { readdirSync } = require("fs");
var CronJob = require('cron').CronJob;


const client = new Discord.Client();

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

var config = require('./config/private.json') ///SAME AS PUBLIC BUT WITHOUT TOKEN


readdirSync("./commands/").filter(file => file.endsWith(".js")).forEach(file => {
    
    let curFile = require(`./commands/${file}`);

    if (curFile.name) {
        client.commands.set(curFile.name, curFile);
        console.log(file + ' import completed.');
    } else {
        console.log(file + ` import failed... help.name not a string or not found.`);
    }

    if (curFile.aliases && Array.isArray(curFile.aliases)) curFile.aliases.forEach(alias => client.aliases.set(alias, curFile.name));
    
});


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {
    if (message.author.bot) return;
    if (!message.guild) return;
    message.content = message.content.toLowerCase();
    if (!message.content.startsWith(config.prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) command.run(client, message, args);
});

client.login(config.token);