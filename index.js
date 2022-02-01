require('dotenv').config();
const { Client, Intents } = require('discord.js');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
    ],
});

client.on('ready', () => {
    console.log('O bot está no ar!');
});

client.on('messageCreate', (message) => {
    if(message.author.bot) return;

    if(message.content === 'ping') {
        message.channel.send(`O ping do bot é de estimados ${client.ws.ping} ms`);
    }
});

client.login(process.env.token);