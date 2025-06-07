import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import { scheduleReminder } from './reminder.js';

dotenv.config();

const bot = new TelegramBot('7355709918:AAFaBJdizVhxRVuUmhVwoBfSHsrvcT5mCfE', { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Привет! Напиши напоминание в формате: "Напомни через 10 минут купить хлеб".');
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (/через (\d+) (минут|час|часа|часов)/.test(text)) {
    const [, time, unit] = text.match(/через (\d+) (минут|час|часа|часов)/);
    const minutes = unit.startsWith('час') ? parseInt(time) * 60 : parseInt(time);

    const task = text.replace(/напомни через .*?(купить|сделать|проверить|.+)/i, '$1');

    scheduleReminder(minutes, () => {
      bot.sendMessage(chatId, `Напоминаю: ${task}`);
    });

    bot.sendMessage(chatId, `Окей! Напомню через ${minutes} минут.`);
  }
});
