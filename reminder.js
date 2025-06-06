export function scheduleReminder(minutes, callback) {
    setTimeout(callback, minutes * 60 * 1000);
  }
  