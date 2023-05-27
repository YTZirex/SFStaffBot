const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");
let data = {};
const filePath = path.join(__dirname, "..", "database", "connexions.json");
try {
  data = JSON.parse(fs.readFileSync(filePath));
} catch (error) {
  console.error("Error reading JSON file:", error);
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("connexion")
    .setDescription("Permet de lancer une connexion staff."),

  async execute(interaction) {
    const userId = interaction.user.id;

    // Check if the user exists in the data object
    if (data.hasOwnProperty(userId)) {
      const connexionsCount = data[userId].connexions;
      const firstExecutionTime = data[userId].firstExecutionTime;
    } else {
      // User not found, create a new entry with 0 connexions and current time as first execution time
      const currentTime = new Date().toISOString();
      data[userId] = {
        connexions: 0,
        firstExecutionTime: currentTime,
      };
      console.log(
        "User not found in the connexions data. New user created with 0 connexions."
      );
      console.log(`First execution time: ${currentTime}`);
    }

    // Increment the connexions count
    data[userId].connexions += 1;

    // Write the updated JSON data back to the file
    fs.writeFile(filePath, JSON.stringify(data), "utf8", (err) => {
      if (err) {
        console.error("Error writing JSON file:", err);
      } else {
        console.log("JSON file updated successfully.");
        const connexionsEmbed = new EmbedBuilder()
          .setColor("Green")
          .setTitle(`**Coucou, ${interaction.user.username} !**`)
          .setThumbnail("https://i.ibb.co/J7tkRk0/secours-france-512-512.png")
          .addFields({
            name: "**:white_check_mark: Connexion réussi!**",
            value: "*Votre connexion a bien été enregistrée.*",
          })
          .setTimestamp();
        interaction.reply({ embeds: [connexionsEmbed] });
      }
    });
    /*
    // Update the data object with new information
    let userId = interaction.user.id; // example user ID
    if (!data[userId]) {
      data[userId] = { connexions: 0 };
    }
    data[userId].connexions += 1;

    // Write the updated JSON data back to the file
    fs.writeFile(filePath, JSON.stringify(data), "utf8", (err) => {
      if (err) {
        console.error("Error writing JSON file:", err);
      } else {
        console.log("JSON file updated successfully.");

        const connexionsEmbed = new EmbedBuilder()
          .setColor("Green")
          .setTitle(`**Coucou, ${interaction.user.username} !**`)
          .addFields({
            name: "**:white_check_mark: Connexion réussi!**",
            value: "*Votre connexion a bien été enregistrée.*",
          })
          .setTimestamp();
        interaction.reply({ embeds: [connexionsEmbed] });
      }
    });*/
  },
};
