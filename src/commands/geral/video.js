const discord = require('discord.js');
const Video = require('../../models/video');
const pagination = require('discord.js-pagination');

module.exports = {
    name: 'video',
    description: 'Armazenar video',
    type: 'CHAT_INPUT',
    options: [
        {
            name: 'link',
            type: 'STRING',
            description: 'Link para o video.',
            required: true,
        },
        {
            name: 'linkthumb',
            type: 'STRING',
            description: 'Link da thumbnail.',
            required: true,
        },
    ],
    run: async (client, interaction) => {
        const videoLink = interaction.options.getString('link');
        const thumbLink = interaction.options.getString('linkthumb');

        await Video.create({
            url: videoLink,
            thumbnail: thumbLink,
        });

        await interaction.reply(`${videoLink}, ${thumbLink} registrados com sucesso.`);
    },
};