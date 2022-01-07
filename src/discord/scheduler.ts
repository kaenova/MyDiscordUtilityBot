import CrontabManager from 'cron-job-manager';
import { Client, TextChannel } from "discord.js";
import { SendPengingat } from '../action/sendPengingat';
import { Log } from '../utils/logger';

function InitScheduler(client: Client, manager: CrontabManager) : Client {
  if (process.env.INGAT_CHANNEL == undefined) {
    Error("Environment ingat channel belum ada")
    throw new Error("Environment ingat channel belum ada")
  }

  var ch  = client.channels.cache.get(process.env.INGAT_CHANNEL)

  manager.add('default1', '0 7 * * *', async () => {
    console.log("Jalan")
    SendPengingat(client)
  }, {start: true})

  manager.add('default2', '* * * * *', async () => {
    console.log("Jalan")
    SendPengingat(client)
  }, {start: true})

  return client;
}

export { InitScheduler };
