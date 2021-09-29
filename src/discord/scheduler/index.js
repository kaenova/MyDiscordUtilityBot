function initScheduler(client) {
  const scheduler = require("node-schedule");
  const tz = "Asia/Jakarta";

  const testRule = new scheduler.RecurrenceRule();
  testRule.second = 1;
  testRule.tz = tz;
  scheduler.scheduleJob(testRule, () => {
   require('./sendPengingat').sendPengingat(client)
  });

  const testRule2 = new scheduler.RecurrenceRule();
  testRule2.second = 5;
  testRule2.tz = tz;
  scheduler.scheduleJob(testRule2, () => {
   require('./sendPengingat').sendPengingat(client)
  });


  console.log("success");
}

module.exports = { initScheduler };
