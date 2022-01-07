import { Client, Message } from "discord.js";
import { Command } from "./command";

const Ping: Command = {
  deskripsi: 'Digunakan untuk pengetesan server ping 🏓',
  nama: 'Ping',
  panggil: 'ping',
  func(client: Client, msg: Message) {
    msg.reply("Pong 🏓")
  }
}

export { Ping }