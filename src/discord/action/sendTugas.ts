import { Client, EmbedFieldData, Message, MessageEmbed, MessageOptions, MessagePayload, TextChannel } from "discord.js";
import { Critical, dateNow, Log } from "../../utils/logger";
import fs from 'fs'
import ical from 'node-ical'
import axios from 'axios';
import { IndonesianDay, IndonesianMonth, MoodleEvent } from "../../entity/moodleEvent";

async function SendTugas(
  client: Client,
  channel?: TextChannel,
  msg?: Message
) {
  /**
   Jika Channel digunakan maka akan ke yang diminta
   Jika message digunakan maka akan dikirimkan ke channel message dikirim 
  */

  // Error handling prerequisites
  if (process.env.INGAT_CHANNEL == undefined) {
    Critical("Harus menyiapkan Environment Ingat Channel");
    throw new Error("Harus menyiapkan Environment Ingat Channel");
  }
  if (channel == undefined)
    channel = await client.channels.fetch(process.env.INGAT_CHANNEL) as TextChannel;

  const finalPesan = new MessageEmbed()
    .setColor('#000000')
    .setTitle('Tugas LMS Tersedia')
    .setAuthor({ name: 'Discord Pengingat by Kaenova 📑' })
    .setDescription('Berikut merupakan Tugas yang ada pada LMS: ')

  // Check if message available and controlling it
  var urlBefore = ""
  if (msg !== undefined) {
    var split: Array<string> = []
    split = msg.content.split(" ")
    if (split != [] && split[0] == 'set') {
      if (split.length < 2) {
        msg.reply("Untuk melakukan setting default gunakan command `tugas set [link]`")
        return
      }
      if (process.env.DEFAULT_MOODLE_CALENDAR !== undefined) urlBefore = process.env.DEFAULT_MOODLE_CALENDAR;
      process.env.DEFAULT_MOODLE_CALENDAR = split[1]
      finalPesan.setTitle('Tugas LMS Tersedia | Link Calendar Terset')
    }
  }

  if (process.env.DEFAULT_MOODLE_CALENDAR == undefined) {
    channel.send('Default link tugas belum disiapkan, lakukan setting default tugas dengan menggunakan command `tugas set [link]`')
    return
  }

  // Try to fetch
  var events: ical.CalendarResponse
  try {
    var response = await axios.get(process.env.DEFAULT_MOODLE_CALENDAR)
    fs.writeFileSync('./data/temp.ics', response.data)
    events = ical.sync.parseFile('./data/temp.ics');
  } catch (e) {
    channel.send('Gagal dalam melakukan pengambilan data. Menghilangkan default link tugas')
    process.env.DEFAULT_MOODLE_CALENDAR = undefined
    return
  }

  // Tidak ada tugas
  if (Object.keys(events).length == 0) {
    if (msg == undefined) {
      channel.send("Tidak ada tugas di moodle yang tersimpan 🤗");
    } else {
      msg.reply("Tidak ada tugas di moodle yang tersimpan 🤗");
    }
    return;
  }

  var field: Array<EmbedFieldData> = []
  for (const event of Object.values(events)) {
    var date: ical.DateWithTimeZone = event.end as ical.DateWithTimeZone
    if (date.getTime() > Date.now()) {
      var temp: MoodleEvent = {
        summary: event.summary as string,
        description: event.description as string,
        date: date.getDate(),
        day: date.getDay(),
        hours: date.getHours(),
        minute: date.getMinutes(),
        month: date.getMonth(),
        year: date.getFullYear()
      }
      if (temp.summary.length > 1024) {
        temp.description = temp.description.substring(0, 500) + "..."
      }
      if (temp.description.length > 1024) {
        temp.description = temp.description.substring(0, 500) + "..."
      }
      var embed: EmbedFieldData = {
        name: temp.summary,
        value:
          `**Waktu**: \u0060${temp.hours}:${temp.minute}\u0060 || \u0060${IndonesianDay[temp.day]}, ${temp.date} ${IndonesianMonth[temp.month]} ${temp.year}\u0060\n` +
          `**Deskripsi**:\n${temp.description}`

      }

      field.push(embed);
    }
  }

  finalPesan
    .addFields(field)
    .addFields({ name: 'Setting calendar tugas', value: '`tugas set [link calendar moodle]`' })
    .setTimestamp()

  channel.send({ embeds: [finalPesan] });
}

export { SendTugas };
