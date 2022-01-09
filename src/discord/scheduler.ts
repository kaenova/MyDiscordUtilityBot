import CrontabManager from 'cron-job-manager';
import { Client, TextChannel } from "discord.js";
import { SendPengingat } from './action/sendPengingat';
import { Log } from '../utils/logger';

function InitScheduler(client: Client, manager: CrontabManager) {
  if (process.env.INGAT_CHANNEL == undefined) {
    Error("Environment ingat channel belum ada")
    throw new Error("Environment ingat channel belum ada")
  }

  manager.add('default1', '0 7 * * *', async () => {
    SendPengingat(client)
  }, {start: true})

  manager.add('default2', '0 12 * * *', async () => {
    SendPengingat(client)
  }, {start: true})

  manager.add('default3', '0 19 * * *', async () => {
    SendPengingat(client)
  }, {start: true})

  // manager.add('default4', '* * * * *', async () => {
  //   SendPengingat(client)
  // }, {start: true})
}

export { InitScheduler };
