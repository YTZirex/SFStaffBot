const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "database", "connexions.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mesinfos")
    .setDescription("Permet de connaître des infos sur ses connexions!"),
  async execute(interaction) {
    const userId = interaction.user.id;

    let data = {};
    try {
      data = JSON.parse(fs.readFileSync(filePath));
    } catch (error) {
      console.error("Error reading JSON file:", error);
    }
    // Check if the user exists in the data object
    if (data.hasOwnProperty(userId)) {
      const connexionsCount = data[userId].connexions;
      const firstExecutionTime = data[userId].firstExecutionTime;
      console.log(`connexions: ${connexionsCount}`);
      console.log(
        `First execution date: ${new Date(firstExecutionTime).toLocaleString()}`
      );
    } else {
      // User not found in the connexions data
      console.log("User not found in the connexions data.");
    }

    // Write the updated JSON data back to the file
    fs.writeFile(filePath, JSON.stringify(data), "utf8", (err) => {
      if (err) {
        console.error("Error writing JSON file:", err);
      } else {
        console.log("JSON file updated successfully.");
        const connexionsCount = data[userId].connexions;
        //const firstExecutionTime = data[userId].firstExecutionTime;
        const firstExecutionTime = new Date(data[userId].firstExecutionTime);
        const firstExecutionDate = Math.floor(
          firstExecutionTime.getTime() / 1000
        );
        const infosEmbed = new EmbedBuilder()
          .setTitle("Vos informations")
          .setThumbnail("https://i.ibb.co/J7tkRk0/secours-france-512-512.png")
          .setColor("Blurple")
          .addFields(
            {
              name: "**Première connexion:** ",
              //  value: `${new Date(firstExecutionTime).toLocaleString()}`,
              value: `<t:${firstExecutionDate}:F>`,
            },
            {
              name: "**Total de connexions: **",
              value: `${connexionsCount}`,
            }
          );

        interaction.user.send({ embeds: [infosEmbed] });
      }
    });
  },
};
