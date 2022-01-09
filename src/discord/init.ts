import { Client, Intents, MessageReaction, User } from "discord.js";
import { Critical, Info, Log } from "../utils/logger";
import { messageController } from "./messageController";
import { messageReactionController } from "./messageReactionController";
import { InitScheduler } from "../scheduler/init";
import CrontabManager from 'cron-job-manager'

//@ts-ignore
var CronManager = new CrontabManager();
var MainClient = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
});

function InitDiscord(): Client {

  // On Init
  MainClient.on("ready", () => {
    if (MainClient.user !== null) {
      Info(`Logged in as ${MainClient.user.tag}`);
    } else {
      Critical("User is null");
      throw new Error("User is null");
    }
  });

  // On Created Message
  MainClient.on("messageCreate", async (msg) => {
    messageController(MainClient, msg);
  });

  // On Message Reaction
  MainClient.on("messageReactionAdd", async (msg, user) => {
    if (!(user instanceof User)) return;
    if (!(msg instanceof MessageReaction)) return;
    messageReactionController(MainClient, msg, user);
  });

  // Scheduled Job Default
  InitScheduler(MainClient, CronManager);

  return MainClient;
}

export { InitDiscord, CronManager, MainClient };
