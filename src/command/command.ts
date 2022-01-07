import { Client, Message } from 'discord.js';

interface Command {
  nama: string,
  deskripsi: string,
  panggil: string,
  func(client:Client, msg: Message): void
}

export { Command }