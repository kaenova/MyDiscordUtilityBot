import { Message, EmbedFieldData, MessageEmbed } from 'discord.js';
import { Client } from 'discord.js';
import { Command } from ".";
import { SendPengingat } from '../action/sendPengingat';
import { CronManager } from '../discord/init';
import { trimSpace } from '../utils/trimSpace';

async function sendSchedule(client: Client, msg: Message) {
  var field: Array<EmbedFieldData> = []

  // Ngolah API Scheduler
  var outCron: Array<String> = CronManager.listCrons().split('\n')
  /**
      '{',
      "'default1': 0 7 * * * status: Running ",
      "'default2': 0 12 * * * status: Running ",
      "'default3': 0 19 * * * status: Running ",
      '',
      '}'

      Remove Last, Remove Last, Remove First
  */
  outCron.pop()
  outCron.pop()
  outCron.shift()

  // Parsing to Object
  for (let i = 0; i < outCron.length; i++) {
    let currentVal = outCron[i].toString()
    const ReNama = /\'(.*)\'/gm
    const ReCron = /(\d+|\*) (\d+|\*) (\d+|\*) (\d+|\*) (\d+|\*)/gm
    const ReStatus = /status: (\S+)/gm
    //@ts-ignore
    let nama = ReNama.exec(currentVal)[0]
    //@ts-ignore
    let cron = ReCron.exec(currentVal)[0]
    //@ts-ignore
    let jobStatus = ReStatus.exec(currentVal)[1]
    var embed: EmbedFieldData = {
      name: nama,
      value: `Status: ${jobStatus}\nCron: \u0060${cron}\u0060`
    }
    field.push(embed)
  }

  // inside a command, event listener, etc.
  const finalPesan = new MessageEmbed()
    .setColor('#000000')
    .setTitle('Schedule Pengingat')
    .setAuthor({ name: 'Discord Pengingat by Kaenova 📑' })
    .setDescription('Berikut merupakan schedule bot untuk mengingatkan anda')
    .addFields(field)
    .addFields({name: 'Tambah Schedule', value: `\u0060schedule tambah [nama] [cron]\u0060`, inline: true})
    .addFields({name: 'Hapus Schedule', value: `\u0060schedule hapus [nama]\u0060`,inline: true})
    .setTimestamp()

  msg.channel.send({ embeds: [finalPesan] });
}

async function hapusSchedule(client: Client, msg: Message) {
  try {
    CronManager.deleteJob(msg.content)
    msg.reply("Schedule berhasil terhapus")
  } catch (e) {
    msg.reply("Schedule gagal dihapus, pastikan nama dengan benar")
  }
}

async function tambahSchedule(client: Client, msg: Message){
  let split = msg.content.split(" ")
  if (split.length != 6) {
    msg.reply(`Masukkan tidak valid pastinkan mengikuti pola \u0060schedule tambah [nama] [cron (ada 5)]\u0060\nContoh: \u0060${process.env.PREFIX}schedule tambah percobaan 1 2 3 4 5\u0060`)
    return
  }
  let nama = split.shift() as string
  let cron = split.join(" ")
  try {
    CronManager.add(nama, cron,  async () => {
      SendPengingat(client)
    }, {start: true})
    msg.reply("Berhasil menambahkan schedule")
  } catch (e) {
    msg.reply("Gagal untuk menambahkan schedule")
  }
}

export const Scheulde: Command = {
  nama: "Schedule",
  panggil: "schedule",
  deskripsi:
    "Command ini digunakan untuk menampilkan semua pengingat yang tersimpan.",
  func(client: Client, msg: Message) {
    
    // Tampilkan Schedule
    if (trimSpace(msg.content) == "") {
      sendSchedule(client, msg)
      return
    }

    // Controller Selain Tampilkan Schedule
    let split = msg.content.split(" ")
    let command = split[0]
    split.shift()
    msg.content = split.join(" ")

    if (command == "tambah"){
      tambahSchedule(client, msg)
    } else if (command == "hapus"){
      hapusSchedule(client, msg)
    } else {
      sendSchedule(client, msg)
    }

  },
};
