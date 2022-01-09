const axios = require('axios');
const ical = require('node-ical');
const fs = require('fs');

(async function () {
  // use the sync function parseFile() to parse this ics file
  var response = await axios.get("https://lms.telkomuniversity.ac.id/calendar/export_execute.php?userid=21342&authtoken=fd2571b30394cdefa2d42f634f5d7d292da8b731&preset_what=all&preset_time=custom")
  fs.writeFileSync('./data/temp.ics', response.data, err => {
    throw new Error("Failed when writing temporary files")
  })
  const events = ical.sync.parseFile('./data/temp.ics');
  console.log(Object.keys(events))
  // loop through events and log them
  for (const event of Object.values(events)) {
    console.log('==================')
    console.log(
      'Summary: ' + event.end.getDate() +
      '\nDescription: ' + event.description +
      '\nStart Date: ' + event.start.toISOString() +
      '\nEnd Date: ' + event.end.getMonth() +
      '\n'
    );
  };
})()
