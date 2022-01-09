import { Message, EmbedFieldData, MessageEmbed } from 'discord.js';
import { Client } from 'discord.js';
import { Command } from ".";
import { SendPengingat } from '../action/sendPengingat';
import { CronManager } from '../init';
import { trimSpace } from '../../utils/trimSpace';
import { ScheduleList } from '../../utils/schedulerList';
import { SendTugas } from '../action/sendTugas';

async function sendSchedule(client: Client, msg: Message) {
  var field: Array<EmbedFieldData> = []

  var schedules = ScheduleList(CronManager)
  
  // Parsing to Object
  for (let i = 0; i < schedules.length; i++) {
    
    var embed: EmbedFieldData = {
      name: schedules[i].nama,
      value: `Status: ${schedules[i].status}\nCron: \u0060${schedules[i].cron}\u0060`
    }
    field.push(embed)
  }

  // inside a command, event listener, etc.
  const finalPesan = new MessageEmbed()
    .setColor('#000000')
    .setTitle('Schedule Pengingat')
    .setAuthor({ name: 'Discord Pengingat by Kaenova 📑' })
    .setDescription('Berikut merupakan schedule bot untuk mengingatkan pengingat dan tugas anda')
    .addFields(field)
    .addFields({ name: 'Tambah Schedule', value: `\u0060schedule tambah [nama] [cron]\u0060`, inline: true })
    .addFields({ name: 'Hapus Schedule', value: `\u0060schedule hapus [nama]\u0060`, inline: true })
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

async function tambahSchedule(client: Client, msg: Message) {
  let split = msg.content.split(" ")
  if (split.length != 6) {
    msg.reply(`Masukkan tidak valid pastinkan mengikuti pola \u0060schedule tambah [nama] [cron (ada 5)]\u0060\nContoh: \u0060schedule tambah percobaan 1 2 3 4 5\u0060`)
    return
  }
  let nama = split.shift() as string
  let cron = split.join(" ")
  try {
    CronManager.add(nama, cron, async () => {
      SendPengingat(client)
      SendTugas(client)
    }, { start: true })
    msg.reply("Berhasil menambahkan schedule")
  } catch (e) {
    msg.reply("Gagal untuk menambahkan schedule")
  }
}

export const Scheulde: Command = {
  nama: "Schedule",
  panggil: "schedule",
  deskripsi:
    "Command ini digunakan untuk menampilkan schedule.",
  async func(client: Client, msg: Message) {

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

    switch (command) {
      case "tambah":
        tambahSchedule(client, msg)
        break
      case "hapus":
        hapusSchedule(client, msg)
        break
      default:
        sendSchedule(client, msg)
    }
  },
};
