const fs = require("fs");
const { parse } = require("path");
const { serialize } = require("v8");
const apptsByDay = JSON.parse(fs.readFileSync("./data/appts-days-v2.json"));

// Solve for Monday, then try other days of the week
const appts = apptsByDay[0];
console.log({ appts });

let numAvailableSlots = 0;

// revisit str/num
let startTime = 9 * 60;
let lastPossibleEndTime = (17 * 60) - 30;
while (startTime < lastPossibleEndTime) {
  let nextApptData = appts.pop()
  if (nextApptData) {
    let nextAppt = nextApptData.start;
    let nextApptDuration = nextApptData.duration;
    let nextApptTimes = nextAppt.split(':')
    let nextApptHour = Number(nextApptTimes[0]);
    let nextApptMin = Number(nextApptTimes[1]);
    let nextApptTotalMinutes = (60 * nextApptHour) + nextApptMin;

    // 9:15 duration: 40
    // <space> 10:00 - 9:45
    // 10:00 duration: 60
    // if (((startTime + 30) < (nextApptTotalMinutes + nextApptDuration))) {
    if ((nextApptTotalMinutes - (startTime + duration)) >= 30) {
      if ((startTime < nextApptTotalMinutes) && (startTime + 30 < nextApptTotalMinutes))
      console.log(`Adding appt comparing starttime:${startTime} with next appt ${nextApptTotalMinutes}`);
      startTime += 30;

      numAvailableSlots++
    } else {
      startTime = nextApptTotalMinutes + nextApptDuration;
    }
  } else {
    console.log(`Adding appointment, no nextappt conflict for startTime: ${startTime}`)
    startTime += 30;

    numAvailableSlots++
  }

}
