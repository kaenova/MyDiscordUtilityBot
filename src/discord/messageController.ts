import { Client, Message } from "discord.js";
import { Critical, Log } from "../utils/logger";
import commands, { Command } from "../command";
const commandss: {[index: string]: Command} = commands

var allPemanggilan:{[index: string]: (client: Client, msg: Message<boolean>) => void} = {}
let allCommands = Object.keys(commands)

allCommands.forEach((key) => {
  allPemanggilan[commandss[key]['panggil']] = commandss[key]['func']
})

async function messageController(client: Client, msg: Message) {
  const prefix = process.env.PREFIX
  
  if (prefix === undefined) {
    Critical("Prefix must be specified")
    throw new Error("Prefix must be specified")
  }
  
  if (msg.content.slice(0, prefix.length) != prefix || msg.author.bot) {
    return;
  }

  // Hilangkan prefix
  msg.content = msg.content.slice(
    prefix.length,
    msg.content.length
  );

  // Ambil Command
  let splitContent = msg.content.split(" ");
  const command = splitContent[0];

  // Menghapus Command
  splitContent.shift();
  msg.content = splitContent.join(" ");
  
  if (!Object.keys(allPemanggilan).includes(command)) return
  
  try {
    allPemanggilan[command](client, msg)
  } catch (e) {
    msg.reply("Server gagal mengolah, harap coba lagi. 🙇‍♂️🙇‍♀️")
  }
}

export { messageController }