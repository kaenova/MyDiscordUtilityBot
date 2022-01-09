import { Client, Message } from "discord.js";
import { Command } from "./command";

const Prefix: Command = {
  deskripsi: "Penggantian Prefix BOT dapat melalui command ini!",
  nama: "Prefix",
  panggil: "prefix",
  async func(client: Client, msg: Message) {
    if (client.user == null) throw new Error("Client is null")
    const split: Array<string> = msg.content.split(" ")
    if (split.length < 1) {
      msg.reply("Tidak valid, pastikan terdapat satu kata untuk prefix\nContoh: `prefix &`")
      return
    }
    try {
      process.env.PREFIX = split[0]
      msg.reply(`Prefix berhasil diubah menjadi \u0060${split[0]}\u0060`)
      client.user.setPresence({ activities: [{ name: `${process.env.PREFIX}help`, type: 'LISTENING' }], status: 'online' });
    } catch (err) {
      throw new Error("Tidak dapat mengganti prefix.");
    }
  },
};

export { Prefix };
