import { Client, Message, TextChannel } from "discord.js";
import { SendTugas } from "../action/sendTugas";
import { Command } from "./command";

const Tugas: Command = {
  nama: "Tugas",
  panggil: "tugas",
  deskripsi:
    "Menampilkan tugas yang tersedia pada moodle berdasarkan link default.\n"+
    "Jika belum melakukan setting default moodle gunakan `tugas default [link]`"
    ,
  async func(client: Client, msg: Message) {
    if (!(msg.channel instanceof TextChannel)) return;
    SendTugas(client, msg.channel, msg);
  },
};

export { Tugas };
