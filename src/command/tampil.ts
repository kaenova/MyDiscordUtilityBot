import { Client, Message, TextChannel } from "discord.js";
import { Critical, dateNow, Log } from "../utils/logger";
import { Command } from "./command";
import fs from 'fs'
import { Attachment, Pengingat } from '../entity'

async function SendPengingat(client: Client, channel: TextChannel, msg?: Message) {
  const task = await Pengingat.findAll({ include: Attachment })
  Log(JSON.stringify(task))

  // Error handling prerequisites
  if (process.env.INGAT_CHANNEL == undefined) {
    Critical('Harus menyiapkan Environment Ingat Channel')
    throw new Error("Harus menyiapkan Environment Ingat Channel")
  }

  // Tidak ada pengingat
  if (task.length == 0) {
    if (msg == undefined) {
      channel.send("Tidak ada pengingat yang tersimpan 🤗")
    } else {
      msg.reply("Tidak ada pengingat yang tersimpan 🤗")
    }
    return
  }

  channel.send(`Diambil pada **${dateNow()}**`)
  task.forEach(task => {
    // Preparing attachments
    var attment: Array<string> = []

    // @ts-ignore
    task["Attachments"].forEach(obj => {
      attment.push(obj["dir"])
    })

    channel.send({
      // @ts-ignore
      content: task["text"],
      // @ts-ignore
      files: attment
    }).then(msg => {
      msg.react("✅")
      // @ts-ignore
      task.id_msg = msg.id
      task.save()
    })
  })
}

const Tampil: Command = {
  nama: "Tampil",
  panggil: "tampil",
  deskripsi: "Command ini digunakan untuk menampilkan semua pengingat yang tersimpan.",
  func(client: Client, msg: Message) {
    if (!(msg.channel instanceof TextChannel)) return
    SendPengingat(client, msg.channel, msg)
  }
}

export { Tampil, SendPengingat }