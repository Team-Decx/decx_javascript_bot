const discord = require('discord.js');
const Video = require('../../models/video');

module.exports = {
    name: 'getvideos',
    description: 'Buscar vídeos na database.',
    type: 'CHAT_INPUT',
    run: async (client, interaction) => {
        try {
            await interaction.deferReply().catch((_) => { });
            const videos = await Video.find();
            if (!videos) return interaction.reply({ content: ' Não há vídeos registrados na database.' });

            let pageNumber = 1;
            const embed = new discord.MessageEmbed()
                .setColor('AQUA')
                .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 4096 }))
                .setTimestamp()
                .setFooter({ text: `Página ${pageNumber}/${videos.length}` })

            const getButtons = (pageNumber) => {
                return new discord.MessageActionRow().addComponents(
                    new discord.MessageButton()
                        .setLabel('Voltar')
                        .setCustomId('prev')
                        .setStyle('SUCCESS')
                        .setDisabled(pageNumber <= 1),
                    new discord.MessageButton()
                        .setLabel('Avançar')
                        .setCustomId('next')
                        .setStyle('SUCCESS')
                        .setDisabled(!(pageNumber < videos.length)),
                );
            }

            embed.setDescription(`**${videos[pageNumber - 1].url}**`).addFields(
                {
                    name: `${videos[pageNumber - 1].url}`,
                    value: `${videos[pageNumber - 1].thumbnail}`,
                    inline: true,
                },
            );

            const interactionMsg = await interaction.editReply({ embeds: [embed], components: [getButtons(pageNumber)], fetchReply: true });
            const collector = interactionMsg.createMessageComponentCollector({ time: 600000, componentType: 'BUTTON' });

            collector.on('collect', async (i) => {
                if (i.customId === 'next') {
                    pageNumber++;
                } else if (i.customId === 'prev') {
                    pageNumber--;
                }

                let video = videos[pageNumber - 1];
                embed.fields = [];
                embed.setDescription(`**${video.url}**`).addFields(
                    {
                        name: `${video.url}`,
                        value: `${video.thumbnail}`,
                        inline: true,
                    },
                ).setFooter({ text: `Página ${pageNumber}/${videos.length}` });

                await i.update({ embeds: [embed], components: [getButtons(pageNumber)], fetchReply: true });
            });

        } catch (err) {
            console.error(err);
        }
    }
}