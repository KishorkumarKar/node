export const timeConversion = (selectedTime: string, type = 24): string => {
  let [h, rest] = selectedTime.split(":");
  if (type === 24) {
    let [m, a] = rest.split(" ");
    if (h === "12") {
      h = "00";
    }
    let hour = parseInt(h, 10);
    if (a === "PM") {
      hour += 12;
    }
    return `${String(hour).padStart(2, "0")}:${m}`;
  } else {
    let hour = parseInt(h, 10);
    let a = "AM";
    if (hour >= 12) {
      hour = hour === 12 ? 12 : hour % 12;
      a = "PM";
    } else if (hour === 0) {
      hour = 12;
    }
    return `${String(hour).padStart(2, "0")}:${rest} ${a}`;
  }
};

/**
 * This return end time in 24 hr format
 * @param startTime
 * @param numberOfClass
 * @param breakTime
 * @param duration
 * @returns
 */
export const getEndTime = (
  startTime: string,
  numberOfClass: number,
  breakTime: number,
  duration: number,
): string => {
  let [h, a] = startTime.split(":");
  let hour = parseInt(h, 10);
  let totalMinuets = hour * 60 + numberOfClass * duration + breakTime;
  hour = Math.floor(totalMinuets / 60);
  if (hour > 23) {
    throw new Error("Invalid start date");
  }
  return ` ${hour}:${totalMinuets % 60}`;
};
