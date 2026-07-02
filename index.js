require("dotenv").config();

const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

const CHANNEL_ID = process.env.CHANNEL_ID;
const LOG_CHANNEL = "1522188735486365777";

client.on("ready", () => {
  console.log(`Conectado como ${client.user.tag}`);
});

client.on("messageCreate", async message => {

  if (message.author.bot) return;

  // No banear administradores
  if (message.member.permissions.has("Administrator"))
      return;

  if (message.channel.id === CHANNEL_ID) {

    try {

      // Borra el mensaje
        await message.delete().catch(() => {});

    const logChannel = message.guild.channels.cache.get(LOG_CHANNEL);

      if (logChannel) {

        await logChannel.send(
        `🚫 ${message.author.tag} fue baneado automáticamente

        📝 Mensaje: ${message.content}

        📍 Canal: <#${CHANNEL_ID}>`
      }  

      await message.member.ban({
        reason: "Autoban channel"
      });

      console.log(`${message.author.tag} baneado`);

    } catch(err) {

      console.log(err);

    }

  }

});

client.login(process.env.TOKEN);