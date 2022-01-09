import CrontabManager from 'cron-job-manager';
import { Client, TextChannel } from "discord.js";
import { SendPengingat } from '../discord/action/sendPengingat';
import { SendTugas } from '../discord/action/sendTugas';
import { Log } from '../utils/logger';

function InitScheduler(client: Client, manager: CrontabManager) {
  if (process.env.INGAT_CHANNEL == undefined) {
    Error("Environment ingat channel belum ada")
    throw new Error("Environment ingat channel belum ada")
  }

  // Pengingat Default
  manager.add('defaultPengingat1', '0 7 * * *', async () => {
    // Send to Discord
    SendPengingat(client)
    SendTugas(client)
  }, {start: true})

  manager.add('defaultPengingat2', '0 12 * * *', async () => {
    // Send to Discord
    SendPengingat(client)
    SendTugas(client)
  }, {start: true})

  manager.add('defaultPengingat3', '0 19 * * *', async () => {
    // Send to Discord
    SendPengingat(client)
    SendTugas(client)
  }, {start: true})

 
  // manager.add('default4', '* * * * *', async () => {
  //   SendPengingat(client)
  // }, {start: true})
}

export { InitScheduler };
