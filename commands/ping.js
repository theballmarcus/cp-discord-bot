module.exports = {
    name: "ping",
    description: "Returns latency and API ping",
    run: async (client, message, args) => {
        const msg = await message.channel.send(`Pinging....`);

        msg.edit(`Pong!
        Ping latency: ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms
        Discord API latency: ${Math.round(client.ping)}ms`);
    }
} 