const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "database", "connexions.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("Affiche le classement des utilisateurs avec le plus de connexions!"),
  async execute(interaction) {
    let data = {};
    try {
      data = JSON.parse(fs.readFileSync(filePath));
    } catch (error) {
      console.error("Error reading JSON file:", error);
      return;
    }

    // Sort the user IDs based on their connection counts
    const sortedUserIds = Object.keys(data).sort(
      (a, b) => data[b].connexions - data[a].connexions
    );

    const embed = new EmbedBuilder()
      .setTitle("Classement des connexions")
      .setColor("Blue")
      .setThumbnail('https://i.ibb.co/J7tkRk0/secours-france-512-512.png');

    sortedUserIds.slice(0, 10).forEach((userId, index) => {
      let userString = userId;
      const user = interaction.guild.members.cache.get(userId);
      if (user) {
        userString = `${user.user.username}#${user.user.discriminator}`;
      }
      const connexionsCount = data[userId].connexions;
      embed.addFields(
        { name: `**#${index + 1} - ${userString}**`, value: `Connexions: **${connexionsCount}**`, inline: false },
        { name: '\u200A', value: '\u200A', inline: false}
      )
    });

    interaction.reply({ embeds: [embed] });
  },
};
