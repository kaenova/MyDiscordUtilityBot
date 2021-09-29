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

  client.on('messageReactionAdd', (msg, usr) => {
    if (!usr.bot){
    console.log("=================")
    console.log(msg)
    // Do delete pengingat
    }
  })

  console.log("success");
  return client;
}

module.exports = { initDiscord };
