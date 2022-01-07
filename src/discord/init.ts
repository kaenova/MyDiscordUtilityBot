import { Client, Intents, MessageReaction, User } from "discord.js";
import { Critical, Info, Log } from "../utils/logger";
import { messageController } from "./messageController";
import { messageReactionController } from "./messageReactionController";

function InitDiscord(): Client {
    const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });

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
    messageController(client, msg)
  })

  // On Message Reaction
  client.on("messageReactionAdd", async (msg, user) => {
    if (!(user instanceof User)) return;
    if (!(msg instanceof MessageReaction)) return;
    messageReactionController(client, msg, user);
  })

  return client;
}

export { InitDiscord }