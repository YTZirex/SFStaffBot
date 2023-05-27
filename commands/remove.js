const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "database", "connexions.json");
const requiredRoleId = "1112033100176822362"; //"1013418099636187236";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("remove")
    .setDescription("Enlever une connexion à un utilisateur.")
    .addUserOption((option) =>
      option
        .setName("utilisateur")
        .setDescription("Choisissez un utilisateur")
        .setRequired(true)
    ),

  async execute(interaction) {
    // Check if the user has the required role
    const member = interaction.member;
    if (!member.roles.cache.has(requiredRoleId)) {
      interaction.reply(
        "Vous n'avez pas la permission d'utiliser cette commande."
      );
      return;
    }

    const user = interaction.options.getUser("utilisateur");
    const userId = user.id;

    let data = {};
    try {
      data = JSON.parse(fs.readFileSync(filePath));
    } catch (error) {
      console.error("Error reading JSON file:", error);
      return;
    }

    if (!data[userId]) {
      data[userId] = {
        connexions: 0,
      };
    } else if (data[userId].connexions === 0) {
      interaction.reply("L'utilisateur a déjà 0 connexions!");
    } else {
      data[userId].connexions -= 1;
    }

    fs.writeFile(filePath, JSON.stringify(data, null, 2), (error) => {
      if (error) {
        console.error("Error writing JSON file:", error);
      }
    });

    const removeEmbed = new EmbedBuilder()
      .setTitle("Connexion supprimée!")
      .setDescription(
        "J'ai supprimée une connexion à " +
          user.username +
          "#" +
          user.discriminator
      )
      .setColor("Green");
    //interaction.reply(
    //  `J'ai enlevé une connexion à **${user.username}#${user.discriminator}** !`
    // );
    interaction.reply({ embeds: [removeEmbed] });
  },
};
