module.exports = async (client, interaction) => {
    if(!interaction.isCommand()) return;
    const command = client.commands.get(interaction.commandName);
    const args = interaction.options;
    if(!command) return;
    try {
        await command.run(client, interaction);
    } catch (err) { 
        console.error(err);
        await interaction.reply({content: 'Ops.. Me deparei com um erro, tente novamente mais tarde.'})
    }
};