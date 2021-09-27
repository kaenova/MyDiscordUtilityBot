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

  console.log("success");
  return client;
}

module.exports = { initDiscord };
