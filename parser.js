import { pluralizeAccusative } from './reminder.js';

export function parseReminderText(text) {
  const timeMatch = text.match(/через (\d+) (секунд[а]?|минут[а]?|час[аов]?)/i);
  if (!timeMatch) return null;

  const [, timeStr, unit] = timeMatch;
  const time = parseInt(timeStr, 10);

  let delaySeconds;
  if (unit.startsWith('час')) {
    delaySeconds = time * 3600;
  } else if (unit.startsWith('минут')) {
    delaySeconds = time * 60;
  } else if (unit.startsWith('секунд')) {
    delaySeconds = time;
  } else {
    return null;
  }

  const taskMatch = text.match(/напомни через \d+ (?:секунд[а]?|минут[а]?|час[аов]?)\s*(.+)/i);
  let task = taskMatch ? taskMatch[1].trim() : 'что-то важное';
  task = task.replace(/^у\s+/i, '');

  const unitWord = pluralizeAccusative(time, unit.startsWith('час')
    ? ['час', 'часа', 'часов']
    : unit.startsWith('минут')
    ? ['минуту', 'минуты', 'минут']
    : ['секунду', 'секунды', 'секунд']
  );

  return { time, unitWord, delaySeconds, task };
}
