import { MessageReaction } from "discord.js";
import { Pengingat, Attachment } from "../entity";
import { Log } from "../utils/logger";

async function HapusPengingat(msg: MessageReaction)  {
  var id: string = msg.message.id
  var ingat = await Pengingat.findOne({where: {id_msg : id}, include: Attachment})
  if (ingat == null)  throw new Error("Tidak ditemukan")
  await ingat.destroy()
  await msg.message.reply("Pengingat berhasil di hapus 👍")
}

export { HapusPengingat }