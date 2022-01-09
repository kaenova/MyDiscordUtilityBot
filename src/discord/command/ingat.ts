import { Client, Message, MessageAttachment } from "discord.js";
import { Command } from ".";
import fs from "fs";
import fetch from "node-fetch";
import { Critical, Info } from "../../utils/logger";
import { db } from "../../db/db";
import { Pengingat } from "../../entity/pengingat";
import { Attachment } from "../../entity/attachment";
import dotenv from "dotenv";
import { trimSpace } from "../../utils/trimSpace";

dotenv.config();

async function downloadAttechement(att: MessageAttachment) {
  let response = await fetch(att.url).catch((e) => {
    Critical(`Gagal melakukan download attachment atas file ${att.name}`);
    throw new Error(`Gagal melakukan download attachment ${att.name}`);
  });
  let buffer = await response.buffer();
  fs.writeFileSync(`data/attachment/${att.name}`, buffer);
  Info(`Berhasil mendownload file ${att.name}`);
}

const Ingat: Command = {
  nama: "Ingat",
  deskripsi:
    'Digunakan untuk menyimpan pengingat yang setiap waktu akan di ingatkan pada channel <#' + process.env.INGAT_CHANNEL + '> 💾\nMasukan: `[pesan yang akan diingat] <Optional Attachment>`',
  panggil: "ingat",
  async func(client: Client, msg: Message) {
    /*
    1. Downloading all attachments if available
    2. Saving the message
    3. Saving the attachment after message is created
    */
    let downloadSucess = true;

    if (trimSpace(msg.content) == "") {
      msg.reply(`Lihat petunjuk pemakaian dengan memanggil \u0060${process.env.PREFIX}help\u0060`)
      return
    }

    msg.attachments.each((att) => {
      //FIXME: Ini bugnya kalau misalkan ada nama file yang sama...
      try {
        downloadAttechement(att);
      } catch (e) {
        Critical("Gagal melakukan download attachment");
        downloadSucess = false;
      }
    });

    if (!downloadSucess) {
      // Deleting all files if one of the download failed
      msg.attachments.each((att) => {
        if (fs.existsSync(`data/attachment/${att.name}`)) {
          fs.rmSync(`data/attachment/${att.name}`);
        }
      });
      Info("Sukses dalam menghapus file yang tidak jadi disimpan");
      throw new Error("Gagal dalam mendownload file");
    }

    // Begin Transaction
    (async function () {
      try {
        await db.transaction(async (t) => {
          // Buat Pengingat
          let ingat = await Pengingat.create({
            text: msg.content,
          });

          msg.attachments.each(async (att) => {
            await Attachment.create({
              dir: `data/attachment/${att.name}`,
              PengingatId: ingat.get("id"),
            });
          });
        });
      } catch {
        throw new Error("Gagal dalam mendownload file");
      }
    })()
      .then(() => {
        msg.reply("Berhasil menyimpan pengingat ✅");
      })
      .catch((e) => {
        Error(`Gagal untuk memasukkan data ke database`);
        throw new Error("Gagal dalam mendownload file");
      });
  },
};

export { Ingat };
