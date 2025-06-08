export function scheduleReminder(minutes, callback) {
    setTimeout(callback, minutes * 60 * 1000);
  }

export function pluralizeAccusative(value, forms) {
  value = Math.abs(value);
  if (value % 10 === 1 && value % 100 !== 11) return forms[0];   // минуту / час
  if ([2, 3, 4].includes(value % 10) && ![12, 13, 14].includes(value % 100)) return forms[1]; // минуты / часа
  return forms[2];
}


  