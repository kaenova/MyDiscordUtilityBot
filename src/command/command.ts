import { Message } from 'discord.js';

interface Command {
  nama: string,
  deskripsi: string,
  panggil: string,
  func(msg: Message): void
}

export { Command }