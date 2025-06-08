import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import { scheduleReminder } from './reminder.js';
import { pluralizeAccusative } from './reminder.js';

dotenv.config();

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Привет! Напиши напоминание в формате: "Напомни через 10 минут купить хлеб".');
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  const timeMatch = text.match(/через (\d+) (минут[а]?|час[аов]?)/i);

  if (timeMatch) {
    const [, timeStr, unit] = timeMatch;
    const time = parseInt(timeStr, 10);
    const minutes = unit.startsWith('час') ? time * 60 : time;

    const taskMatch = text.match(/напомни через \d+ (?:минут[а]?|час[аов]?)\s*(.+)/i);
    let task = taskMatch ? taskMatch[1].trim() : 'что-то важное';
    task = task.replace(/^у\s+/i, '');

    const unitWord = unit.startsWith('час')
      ? pluralizeAccusative(time, ['час', 'часа', 'часов'])
      : pluralizeAccusative(time, ['минуту', 'минуты', 'минут']);

    scheduleReminder(minutes, () => {
      bot.sendMessage(chatId, `Напоминаю: ${task}`);
    });

    bot.sendMessage(chatId, `Окей! Напомню через ${time} ${unitWord}.`);
  }
});

