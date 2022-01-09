import CrontabManager from "cron-job-manager";

interface Schedule {
  nama: string,
  cron: string,
  status: string
}

function ScheduleList(mngr: CrontabManager): Array<Schedule> {
  var schedule: Array<Schedule> = [];

  // Ngolah API Scheduler
  var outCron: Array<String> = mngr.listCrons().split('\n')
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

    let temp: Schedule = {
      nama: nama,
      cron: cron,
      status: jobStatus
    }

    schedule.push(temp)
  }

  return schedule
}

export { ScheduleList }