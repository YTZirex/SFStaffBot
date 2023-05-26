const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("node:fs");
let connexions = require("../database/connexions.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("connexion")
    .setDescription("Permet de lancer une connexion staff."),
  async execute(interaction) {
    if (!connexions[interaction.user.id]) {
      connexions[interaction.author.id] = {
        connexions: 0,
      };
    } else {
      connexions[interaction.user.id] = {
        connexions: connexions[interaction.user.id].connexions + 1,
      };
      fs.writeFile(
        "../database/connexions.json",
        JSON.stringify(connexions),
        (err) => {
          if (err) console.log(err);
        }
      );
      let connexionsEmbed = new EmbedBuilder()
        .setColor("Green")
        .setTitle(`**Coucou, ${interaction.user.name} !`)
        .addFields({
          name: "**:white_check_mark: Connexion réussi!**",
          value: "*Votre connexion a bien été enregistrée.*",
        })
        .setTimestamp();
    }
  },
};
