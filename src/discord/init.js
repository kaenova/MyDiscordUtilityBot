const { DeletePengingat } = require("./deletePengingat");

function initDiscord() {
  const Discord = require("discord.js");
  const client = new Discord.Client();
  const controller = require("./controllers/.");
  require("dotenv").config();

  client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });

  client.on("message", (msg) => {
    controller.controllers(msg);
  });

  client.on("messageReactionAdd", (msg, usr) => {
    if (!usr.bot) {
      try {
        DeletePengingat(msg, usr);
      } catch (e) {
        msg.message.channel.send(`Pengingat gagal terhapus karena ${e}`);
      }
    }
  });

  console.log("success");
  return client;
}

module.exports = { initDiscord };
