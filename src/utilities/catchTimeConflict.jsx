const parseSchedule = (time) => {
    const DAYS = {"M":0, "Tu":1, "W":2, "Th":3, "F":4};

    const schedule = [];
    const parts = time.split(" ");
    const days = parts[0];
    const [startTime, endTime] = parts[1].split("-");

    const toMinutes = (time) => {
        const [hour, minutes] = time.split(":").map(Number);
        return hour * 60 + minutes;
    }

    const dayList = [];
    for (let i = 0; i < days.length; i++) {
        if (days[i] === "T") {
            if (days[i + 1] === "u") {
                dayList.push("Tu");
            } else if (days[i + 1] === "h") {
                dayList.push("Th");
            }
            i++;
        } else {
            dayList.push(days[i]);
        }
    }

    for (const day of dayList) {
        schedule.push({
            day: DAYS[day],
            start: toMinutes(startTime),
            end: toMinutes(endTime)
        });
    }

    return schedule;
}

const conflict = ({time1, time2}) => {
    if (time1.length == 0 || time2.length == 0) {
        return false;
    }

    const schedule1 = parseSchedule(time1);
    const schedule2 = parseSchedule(time2);

    let i = 0;
    let j = 0;
    while (i < schedule1.length && j < schedule2.length) {
        if (schedule1[i].day === schedule2[j].day) {
            if ((schedule1[i].start >= schedule2[j].start && 
                schedule1[i].start < schedule2[j].end) || 
                (schedule1[i].start <= schedule2[j].start &&
                schedule1[i].end > schedule2[j].start
                )
            ) {
                return true;
            }
            i++;
            j++;
        } else if (schedule1[i].day < schedule2[j].day) {
            i++;
        } else {
            j++;
        }
    }

    return false;
};

const catchTimeConflict = ({id, course, selected}) => {
    for (const [selectedId, selectedCourse] of selected) {
        if (id === selectedId) {
            return false;
        }
        if (course.term != selectedCourse.term) {
            continue;
        }
        if (conflict({time1: course.meets, time2: selectedCourse.meets})) {
            return true;
        }
    }

    return false;
}

export default catchTimeConflict;