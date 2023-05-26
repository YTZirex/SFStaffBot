const colors = require('colors');
colors.enable();

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Connecté en tant que ${client.user.username} #${client.user.discriminator}`.green.italic.bold);
	},
};