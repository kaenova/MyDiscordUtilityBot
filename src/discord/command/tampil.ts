import { Client, Message, TextChannel } from "discord.js";
import { SendPengingat } from "../action/sendPengingat";
import { Command } from "./command";

const Tampil: Command = {
  nama: "Tampil",
  panggil: "tampil",
  deskripsi:
    "Command ini digunakan untuk menampilkan semua pengingat yang tersimpan.",
  async func(client: Client, msg: Message) {
    if (!(msg.channel instanceof TextChannel)) return;
    SendPengingat(client, msg.channel, msg);
  },
};

export { Tampil };
