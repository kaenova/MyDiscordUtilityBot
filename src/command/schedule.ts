import { Message } from 'discord.js';
import { Client } from 'discord.js';
import { Command } from ".";
import { CronManager } from '../discord/init';

export const Scheulde: Command = {
  nama: "Schedule",
  panggil: "schedule",
  deskripsi:
    "Command ini digunakan untuk menampilkan semua pengingat yang tersimpan.",
  func(client: Client, msg: Message) {
    console.log(CronManager.listCrons())
  },
};
