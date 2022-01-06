import { Client, Intents } from "discord.js";
import { Critical, Info } from "../utils/logger";
import { messageController } from "./messageController";

function InitDiscord(): Client {
  const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

  // On Init
  client.on('ready', () => {
    if (client.user !== null) {
      Info(`Logged in as ${client.user.tag}`)
    } else {
      Critical("User is null")
      throw new Error("User is null")
    }
  });

  // On Created Message
  client.on('messageCreate', async (msg) => {
    messageController(msg)
  })
  return client;
}

export { InitDiscord }