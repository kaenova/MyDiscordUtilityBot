const ical = require('node-ical')
// use the sync function parseFile() to parse this ics file
const events = ical.sync.parseFile('./src/dumps/icalexport (1).ics');
// loop through events and log them
for (const event of Object.values(events)) {
  console.log('==================')
    console.log(
        'Summary: ' + event.summary +
        '\nDescription: ' + event.description +
        '\nStart Date: ' + event.start.toISOString() +
        '\nEnd Date: ' + event.end.toISOString()+
        '\n'
    );
};