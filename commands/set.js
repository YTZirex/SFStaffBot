const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "database", "connexions.json");
const requiredRoleId = "1112033100176822362"; //"959805260216557660";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("set")
    .setDescription("Choisir le nombre de connexions d'un utilisateur..")
    .addUserOption((option) =>
      option
        .setName("utilisateur")
        .setDescription("Choisissez un utilisateur.")
        .setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName("connexions")
        .setDescription(
          "Choisissez le nombre de connexions pour l'utilisateur."
        )
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

    const connexionsToGive = interaction.options.getNumber("connexions");

    let data = {};
    try {
      data = JSON.parse(fs.readFileSync(filePath));
    } catch (error) {
      console.error("Error reading JSON file:", error);
      return;
    }

    if (!data[userId]) {
      if (connexionsToGive > 0) {
        data[userId] = {
          connexions: connexionsToGive,
        };
        const setEmbed = new EmbedBuilder()
          .setTitle("Connexions modifiée!!")
          .setDescription(
            "**" +
              user.username +
              "#" +
              user.discriminator +
              "** a maintenant **" +
              data[userId].connexions +
              "** connexions !"
          )
          .setColor("Green");
        //  interaction.reply(
        //     `**${user.username}#${user.discriminator}** a maintenant **${connexionsToGive}** connexions !`
        //  );
        interaction.reply({ embeds: [setEmbed] });
      } else {
        interaction.reply(
          "Vous ne pouvez pas mettre des connexions inférieurs à zéro!"
        );
      }
    } else {
      if (connexionsToGive > 0) {
        data[userId].connexions = connexionsToGive;
        const setEmbed = new EmbedBuilder()
          .setTitle("Connexions modifiée!!")
          .setDescription(
            "**" +
              user.username +
              "#" +
              user.discriminator +
              "** a maintenant **" +
              data[userId].connexions +
              "** connexions !"
          )
          .setColor("Green");
        //  interaction.reply(
        //     `**${user.username}#${user.discriminator}** a maintenant **${connexionsToGive}** connexions !`
        //  );
        interaction.reply({ embeds: [setEmbed] });
      } else {
        interaction.reply(
          "Vous ne pouvez pas mettre des connexions inférieurs à zéro!"
        );
      }
    }

    fs.writeFile(filePath, JSON.stringify(data, null, 2), (error) => {
      if (error) {
        console.error("Error writing JSON file:", error);
      }
    });
  },
};
