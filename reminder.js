// Планирует напоминание с задержкой в секундах
export function scheduleReminder(seconds, callback) {
  setTimeout(callback, seconds * 1000);
}

// Универсальная функция склонения для минут, часов и секунд
export function pluralizeAccusative(value, forms) {
  value = Math.abs(value);
  if (value % 10 === 1 && value % 100 !== 11) return forms[0];   // минуту / час / секунду
  if ([2, 3, 4].includes(value % 10) && ![12, 13, 14].includes(value % 100)) return forms[1]; // минуты / часа / секунды
  return forms[2];
}



  