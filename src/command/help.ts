import { Message, MessageEmbed, EmbedFieldData } from 'discord.js';
import { Client } from 'discord.js';
import { Command } from '.';
import command from '.'

export const Help: Command = {
  nama: "Help",
  panggil: "help",
  deskripsi:
    "Command ini digunakan untuk menampilkan pesan ini.",
  func(client: Client, msg: Message) {
    const commandss: { [index: string]: Command } = command;

    var field: Array<EmbedFieldData> = []
    
    Object.keys(commandss).forEach(key => {
      var embed: EmbedFieldData = {
        name : commandss[key].nama+ " [`!"+commandss[key].panggil+"`]",
        value : commandss[key].deskripsi
      }
      field.push(embed)
    })

    // inside a command, event listener, etc.
    const finalPesan = new MessageEmbed()
      .setColor('#000000')
      .setTitle('Command Tersedia')
      .setAuthor({ name: 'Discord Pengingat by Kaenova 📑'})
      .setDescription('Berikut merupakan Command yang tersedia pada Bot Ini.\nGunakan Prefix: `'+process.env.PREFIX+'`')
      .addFields(field)
      .setTimestamp()

    msg.channel.send({ embeds: [finalPesan] });
  },
};


/*
Zero Width Space
        { name: '\u200B', value: '\u200B' },
*/
