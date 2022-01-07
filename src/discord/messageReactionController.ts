import { Client, MessageReaction, User } from "discord.js";
import { Log } from "../utils/logger";
import { HapusPengingat } from "../action/hapusPengingat";

async function messageReactionController(
  client: Client,
  message: MessageReaction,
  user: User
) {
  // Checking
  if (user.bot) return;
  // @ts-ignore
  if (message.client.user?.id != client.user.id) return;
  try {
    HapusPengingat(message);
  } catch (e) {
    Error(`Gagal menghapus dengan id pesan ${message.message.id}`);
    message.message.channel.send(`Gagal dalam menghapus pengingat`);
  }
}

export { messageReactionController };
