import { Client, Message, PresenceData, PresenceStatusData } from "discord.js";
import { MainClient } from "./init"

function PostSetupDiscord() {
  if (MainClient.user == null) throw new Error("User is Null")
  // Setting up status and presence
  MainClient.user.setPresence({ activities: [{ name: `${process.env.PREFIX}help`, type: 'LISTENING' }], status: 'online' });
}

export { PostSetupDiscord }