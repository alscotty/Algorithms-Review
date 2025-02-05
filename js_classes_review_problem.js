"use strict";

const assert = require('assert');
const fs = require("fs");

/*
We are writing software to analyze logs for toll booths on a highway. This highway is a divided highway with limited access; the only way on to or off of the highway is through a toll booth.

There are three types of toll booths:
* ENTRY (E in the diagram) toll booths, where a car goes through a booth as it enters the highway.
* EXIT (X in the diagram) toll booths, where a car goes through a booth as it exits the highway.
* MAINROAD (M in the diagram), which have sensors that record a license plate as a car drives through at full speed.


        Exit Booth                         Entry Booth
            |                                   |
            X                                   E
             \                                 /
---<------------<---------M---------<-----------<---------<----
                                         (West-bound side)

===============================================================

                                         (East-bound side)
------>--------->---------M--------->--------->--------->------
             /                                 \
            E                                   X
            |                                   |
        Entry Booth                         Exit Booth
*/


/*
For our first task:
1-1) Read through and understand the code and comments below. Feel free to run the code and tests.
1-2) The tests are not passing due to a bug in the code. Make the necessary changes to LogEntry to fix the bug.
*/

/*
We are interested in how many people are using the highway, and so we would like to count how many complete journeys are taken in the log file.

A complete journey consists of:
* A driver entering the highway through an ENTRY toll booth.
* The driver passing through some number of MAINROAD toll booths (possibly 0).
* The driver exiting the highway through an EXIT toll booth.

For example, the following excerpt of log lines contains complete journeys for the cars with JOX304 and THX138:

.
.
.
90750.191 JOX304 250E ENTRY
91081.684 JOX304 260E MAINROAD
91082.101 THX138 110E ENTRY
91483.251 JOX304 270E MAINROAD
91873.920 THX138 120E MAINROAD
91874.493 JOX304 280E EXIT
.
.
91982.102 THX138 290E EXIT
.

You may assume that the log only contains complete journeys, and there are no missing entries.

2-1) Write a function in LogFile named countJourneys() that returns how many
     complete journeys there are in the given LogFile.
*/



/*
We would like to catch people who are driving at unsafe speeds on the highway. To help us do that, we would like to identify journeys where a driver does either of the following:
* Drive an average of 130 km/h or greater in any individual 10km segment of tollway.
* Drive an average of 120 km/h or greater in any two 10km segments of tollway.

For example, consider the following journey:
1000.000 TST002 270W ENTRY
1275.000 TST002 260W EXIT

In this case, the driver of TST002 drove 10 km in 275 seconds. We can calculate
that this driver drove an average speed of ~130.91km/hr over this segment:

10 km * 3600 sec/hr
------------------- = 130.91 km/hr
      275 sec
      
{
  TST002: [logEntries]; Ent M ext << add to array -> > 1 journeys, all logs 10K apart
}


Note that:
* A license plate may have multiple journeys in one file, and if they drive at unsafe speeds in both journeys, both should be counted.
* We do not mark speeding if they are not on the highway (i.e. for any driving between an EXIT and ENTRY event).
* Speeding is only marked once per journey. For example, if there are 4 segments 120km/h or greater, or multiple segments 130km/h or greater, the journey is only counted once.

3-1) Write a function catchSpeeders in LogFile that returns a collection of license plates that drove at unsafe speeds during a journey in the LogFile.
     If the same license plate drives at unsafe speeds during two different journeys, the license plate should appear twice (once for each journey they drove at unsafe speeds).
*/

class LogEntry {
  /**
   * Represents an entry from a single log line.
   * 
   * Log lines look like this in the file:
   * 34400.409 SXY288 210E ENTRY
   * 
   * Where:
   * -> 34400.409 is the timestamp in seconds since the software was started.
   * -> SXY288 is the license plate of the vehicle passing through the toll booth.
   * -> 210E is the location and traffic direction of the toll booth. Here, the
   *      toll booth is at 210 kilometers from the start of the tollway, and the E
   *      indicates that the toll booth was on the east-bound traffic side.
   *      Tollbooths are placed every ten kilometers.
   * -> ENTRY indicates which type of toll booth the vehicle went through. This is
   *      one of "ENTRY", "EXIT", or "MAINROAD".
   */
  constructor(logLine) {
    const tokens = logLine.split(' ');
    this.timestamp = Number(tokens[0]);
    this.license_plate = tokens[1];

    this.booth_type = tokens[3];
    this.location = parseInt(tokens[2].slice(0, -1));
    const directionLetter = tokens[2].slice(-1);
    if (directionLetter === 'E') {
      this.direction = 'EAST';
    } else if (directionLetter === 'W') {
      this.direction = 'WEST';
    } else {
      throw new Error('Invalid direction letter');
    }
  }

  toString() {
    return `<LogEntry timestamp: ${this.timestamp} license: ${this.license_plate} location: ${this.location} direction: ${this.direction} booth type: ${this.booth_type}>`;
  }
}

class LogFile {
  /**
   * Represents a file containing a number of log lines, converted to LogEntry objects.
   */
  constructor(fileContents) {
    this.logEntries = [];
    this.licensePlateJourneys = {}
    const lines = fileContents.split('\n');
    for (const line of lines) {
      if (line.trim()) {
        const logEntry = new LogEntry(line.trim());
        this.logEntries.push(logEntry);
      }
    }
  }

  get length() {
    return this.logEntries.length;
  }

  item(index) {
    return this.logEntries[index];
  }

  countJourneys() {
    let numCompleteJourneys = 0;

    this.logEntries.forEach(logEntry => {
      if (logEntry.booth_type === 'EXIT') numCompleteJourneys++;
    })

    return numCompleteJourneys;
  }

  buildLicensePlateJourneys() {
    this.logEntries.forEach(logEntry => {
      const { license_plate } = logEntry
      if (this.licensePlateJourneys[license_plate]) {
        this.licensePlateJourneys[license_plate].push(logEntry)
      } else {
        this.licensePlateJourneys[license_plate] = [logEntry]
      }
    })

    return this.licensePlateJourneys
  }
  //   10 km * 3600 sec/hr
  // ------------------- = 130.91 km/hr
  //       275 sec

  catchSpeeders() {
    let speederPlates = [];
    this.buildLicensePlateJourneys()

    Object.keys(this.licensePlateJourneys).forEach(licensePlate => {
      let entries = this.licensePlateJourneys[licensePlate];
      console.log(`checking ${licensePlate}`)
      console.log({ entries })
      for (let idx = 0; idx < entries.length; idx++) {
        let isMaxSpeeding = false; // 130K/hr
        let subSpeedingCount = 0; // 120K/hr


        let currentEntry = entries[idx];
        let nextEntry = entries[idx + 1];
        if (!nextEntry) continue;

        if (currentEntry.booth_type == 'ENTRY') {
          isMaxSpeeding = false;
          subSpeedingCount = 0;
        } else {
          let timestampDiff = nextEntry.timestamp - currentEntry.timestamp;

          let speed = (
            (10 * 3600) / (timestampDiff)
          );
          console.log(`Speed between ${nextEntry.timestamp} and ${currentEntry.timestamp} is ${speed}km/hr`)

          if (speed >= 130) {
            isMaxSpeeding = true;
            speederPlates.push(licensePlate)
          } else if (speed >= 120) {
            subSpeedingCount++
            if (subSpeedingCount == 2) {
              speederPlates.push(licensePlate)
            }
          }

          if (currentEntry.booth_type === 'EXIT') {
            isMaxSpeeding = false;
            subSpeedingCount = 0;
          }
        }

      }
    })

    console.log({ speederPlates })
    return speederPlates;
  }

}

const testMethods = {
  // These tests are not meant to be exhaustive, and primarily show usage.

  /** Test basic Run functionality */
  testLogFile: () => {
    const logFile = new LogFile(fs.readFileSync("/content/test/tollbooth_small.log", "utf-8"));
    assert(logFile.length === 13);
    for (const entry of logFile.logEntries) {
      assert(entry instanceof LogEntry);
    }
  },
  /** Test basic RunCollection functionality. */
  testLogEntry: () => {
    let logLine = '44776.619 KTB918 310E MAINROAD';
    let logEntry = new LogEntry(logLine);
    assert(logEntry.timestamp === 44776.619);
    assert(logEntry.license_plate === 'KTB918');
    assert(logEntry.location === 310);
    assert(logEntry.direction === 'EAST');
    assert(logEntry.booth_type === 'MAINROAD');

    logLine = '52160.132 ABC123 400W ENTRY';
    logEntry = new LogEntry(logLine);
    assert(logEntry.timestamp === 52160.132);
    assert(logEntry.license_plate === 'ABC123');
    assert(logEntry.location === 400);
    assert(logEntry.direction === 'WEST');
    assert(logEntry.booth_type === 'ENTRY');
  },

  testCountJourneys: () => {
    let logFile = new LogFile(fs.readFileSync("/content/test/tollbooth_small.log", "utf-8"));
    assert.strictEqual(logFile.countJourneys(), 3);

    logFile = new LogFile(fs.readFileSync("/content/test/tollbooth_medium.log", "utf-8"));
    assert.strictEqual(logFile.countJourneys(), 63);
  },

  testCatchSpeeders: () => {
    let logFile = new LogFile(fs.readFileSync("/content/test/tollbooth_speeders.log", "utf-8"));
    // let licenseJourneys = logFile.buildLicensePlateJourneys()
    // console.log("TESTINGNGG")
    // console.log(licenseJourneys)
    let ticketList = logFile.catchSpeeders();
    // ticketList should be a list similar to
    // ["TST002", "TST003", "TST003"]
    // In this case, TST002 had one journey with unsafe driving, and
    // TST003 had two journeys with unsafe driving. The license plates
    // may be in any order.
    assert(ticketList.filter((ticket) => ticket === "TST002").length === 1);
    assert(ticketList.filter((ticket) => ticket === "TST003").length === 2);
    assert((new Set(ticketList)).size === 2);

    logFile = new LogFile(fs.readFileSync("/content/test/tollbooth_medium.log", "utf-8"));
    ticketList = logFile.catchSpeeders();
    assert(ticketList.length === 10);

    logFile = new LogFile(fs.readFileSync("/content/test/tollbooth_long.log", "utf-8"));
    ticketList = logFile.catchSpeeders();
    assert(ticketList.length === 129);
  },
}

// run all tests
Object.getOwnPropertyNames(testMethods).forEach((func) => {
  try {
    console.log(`Running ${func}`);
    testMethods[func]();
    console.log('OK');
  } catch (e) {
    console.log('FAIL');
    console.log(e);
  }
  console.log('');
});
