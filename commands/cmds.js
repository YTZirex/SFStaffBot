const { SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cmds")
    .setDescription("Permet de voir la liste des commandes."),
  async execute(interaction) {
    const cmdsEmbed = new EmbedBuilder()
      .setTitle("Liste des commandes")
      .setDescription(
        "Les commandes add et remove sont seulement accèssible pour les personnes ayant le rôle Assistance Fondation.\nLa commande set est réservé à la fondation."
      )
      .setThumbnail("https://i.ibb.co/J7tkRk0/secours-france-512-512.png")
      .setColor("Green")
      .addFields(
        {
          name: "**Connexion**",
          value: "*Permet de faire une connexion staff.*",
          inline: false,
        },
        {
          name: "**Leaderboard**",
          value:
            "*Permet de voir les 10 premières personnes avec le plus de connexions.**",
          inline: false,
        },
        {
          name: "**Mesinfos**",
          value:
            "*Permet de voir ses informations sur ses connexions (Première connexion, Total de connexions,...*)",
          inline: false,
        },
        {
          name: "**Cmds**",
          value: "*Permet de voir la liste des commandes.*",
          inline: false,
        },
        {
          name: "**Set**",
          value:
            "*Permet de changer le nombre de connexions d'un utilisateur.*",
          inline: false,
        },
        {
          name: "**Add**",
          value: "*Permet d'ajouter une connexion à un utilisateur.",
          inline: false,
        },
        {
          name: "**Remove**",
          value: "*Permet d'enlever une connexion à un utilisateur.",
          inline: false,
        }
      )
      .setTimestamp();

    interaction.reply({ embeds: [cmdsEmbed] });
  },
};
