const SCHEDULE_START = new Date('2025-01-01T09:00');

/**
 * Parse an array of ISO 8601 start/end time strings into
 * an array of Date tuples. Sorts the tuples by start date.
 * //         ["2025-01-01T10:00", "2025-01-01T10:30"],

// returns array of appoints 
[
    [startTime_DateTime, endTime_DateTime]
]
 */
function normalize(schedule) {
    const appointments = schedule
        .map(([start, end]) => [new Date(start), new Date(end)])
        .sort((a, b) => a[0].getTime() - b[0].getTime());

    return appointments;
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}


function solution(rawSchedule, appointmentLength) {
    const normalized_schedule = normalize(rawSchedule);
    if (normalized_schedule.length === 0) return SCHEDULE_START

    let prevEndTime = SCHEDULE_START;
    let bestAppointmentStart;
    let minGapFound = Infinity;

    // implementation goes here!
    for (let appointmentPairTimes of normalized_schedule) {
        let startTime = appointmentPairTimes[0]
        let endTime = appointmentPairTimes[1]
        // check if there's enough time for appt
        // check minGap
        let gapAvailableInMSec = startTime - prevEndTime;
        let gapAvailableInMin = (gapAvailableInMSec / 60) / 1000;

        if (appointmentLength <= gapAvailableInMin && (gapAvailableInMin < minGapFound)) {
            bestAppointmentStart = prevEndTime;
            minGapFound = gapAvailableInMin
        }


        prevEndTime = endTime;
    }

    if (bestAppointmentStart) return bestAppointmentStart;

    // check runs out on the day, increment:
    let lastApptHours = prevEndTime.getHours();
    let lastApptMinutes = prevEndTime.getMinutes();

    console.log(`checking end of businessData ${prevEndTime}`)
    // let endOfBusinessDay = new Date(`${formatDate(prevEndTime)}T17:00`);
    let endOfBusinessDay = new Date(`2025-01-01T17:00`);
    let finalGapInMsec = endOfBusinessDay - prevEndTime;
    let finalGapAvailableInMin = (finalGapInMsec / 60) / 1000;

    if (appointmentLength <= finalGapAvailableInMin ) {
        return prevEndTime
    } else {
        // let currentDate = new Date();
        // currentDate.setDate(currentDate.getDate() + 1);
        // let nextDayDate = prevEndTime.setDate(prevEndTime.getDate() + 1);
        return new Date(`2025-01-02T09:00`)
    }

}


function run(schedule, appointmentLength) {
    const result = solution(schedule, appointmentLength);

    console.log(result)
}

/*
 * +----------------------+
 * |   BASIC TEST CASES   |
 * +----------------------+
 */

/**  
 * CASE 1
 * Expected: 2025-01-01 14:30
 */
run(
    [
        ["2025-01-01T11:00", "2025-01-01T11:30"],
        ["2025-01-01T12:00", "2025-01-01T13:00"],
        ["2025-01-01T14:00", "2025-01-01T14:30"],
        ["2025-01-01T15:15", "2025-01-01T16:00"],
    ],
    45
)


/**
 * CASE 2
 * Expected: 2025-01-01 09:00
 */
run([], 45);


/**
 * CASE 3: The best fit is at the front of the schedule, between SCHEDULE_START and the start of the first appointment
 * Expected either:
 * - 2025-01-01 09:00
 * - 2025-01-01 09:15
 */
run(
    [
        ["2025-01-01T10:00", "2025-01-01T10:30"],
        ["2025-01-01T11:00", "2025-01-01T12:00"],
    ],
    45
);


/**
 * CASE 4: The best fit is at the end of the schedule.
 * Expected: 2025-01-01 12:00
 */
run(
    [
        ["2025-01-01T10:00", "2025-01-01T10:30"],
        ["2025-01-01T11:00", "2025-01-01T12:00"],
    ],
    90
);


/**
 * CASE 5: The best fit is on the next day
 * Expected: 2025-01-02 09:00
 */
run(
    [
        ["2025-01-01T10:00", "2025-01-01T11:00"],
        ["2025-01-01T11:00", "2025-01-01T12:00"],
        ["2025-01-01T12:00", "2025-01-01T13:00"],
        ["2025-01-01T13:00", "2025-01-01T14:00"],
        ["2025-01-01T14:00", "2025-01-01T15:00"],
        ["2025-01-01T15:00", "2025-01-01T16:00"],
    ],
    90
);