function initScheduler(client) {
  const scheduler = require("node-schedule");
  const tz = "Asia/Jakarta";

  const keepAlive = new scheduler.RecurrenceRule();
  keepAlive.minute = 30;
  keepAlive.second = 1;
  keepAlive.tz = tz;
  scheduler.scheduleJob(keepAlive, () => {
    console.log("Still workin");
  });

  const Schedule1 = new scheduler.RecurrenceRule();
  Schedule1.second = 1;
  Schedule1.hour = 8;
  Schedule1.minute = 1;
  Schedule1.tz = tz;
  scheduler.scheduleJob(Schedule1, () => {
    require("./sendPengingat").sendPengingat(client);
  });

  const Schedule2 = new scheduler.RecurrenceRule();
  Schedule2.second = 1;
  Schedule2.hour = 12;
  Schedule2.minute = 1;
  Schedule2.tz = tz;
  scheduler.scheduleJob(Schedule2, () => {
    require("./sendPengingat").sendPengingat(client);
  });

  const Schedule3 = new scheduler.RecurrenceRule();
  Schedule3.second = 1;
  Schedule3.hour = 19;
  Schedule3.minute = 1;
  Schedule3.tz = tz;
  scheduler.scheduleJob(Schedule3, () => {
    require("./sendPengingat").sendPengingat(client);
  });

  console.log("success");
}

module.exports = { initScheduler };
