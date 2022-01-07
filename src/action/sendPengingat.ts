import { Client, Message, TextChannel } from "discord.js";
import { Critical, dateNow, Log } from "../utils/logger";
import { Attachment, Pengingat } from "../entity";

async function SendPengingat(
  client: Client,
  channel?: TextChannel,
  msg?: Message
) {
  const task = await Pengingat.findAll({ include: Attachment });

  // Error handling prerequisites
  if (process.env.INGAT_CHANNEL == undefined) {
    Critical("Harus menyiapkan Environment Ingat Channel");
    throw new Error("Harus menyiapkan Environment Ingat Channel");
  }
  if (channel == undefined) 
    channel = await client.channels.fetch(process.env.INGAT_CHANNEL) as TextChannel

  // Tidak ada pengingat
  if (task.length == 0) {
    if (msg == undefined) {
      channel.send("Tidak ada pengingat yang tersimpan 🤗");
    } else {
      msg.reply("Tidak ada pengingat yang tersimpan 🤗");
    }
    return;
  }

  channel.send(`Diambil pada **${dateNow()}**`);
  task.forEach((task) => {
    // Preparing attachments
    var attment: Array<string> = [];

    // @ts-ignore
    task["Attachments"].forEach((obj) => {
      attment.push(obj["dir"]);
    });
    if (channel == undefined) throw new Error("Channel is undefined")
    channel
      .send({
        // @ts-ignore
        content: task["text"],
        // @ts-ignore
        files: attment,
      })
      .then((msg) => {
        msg.react("✅");
        // @ts-ignore
        task.id_msg = msg.id;
        task.save();
      });
  });
}

export { SendPengingat };
