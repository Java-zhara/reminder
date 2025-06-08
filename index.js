import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import { scheduleReminder } from './reminder.js';
import { parseReminderText } from './parser.js';

dotenv.config();

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Привет! Напиши напоминание в формате: "Напомни через 10 минут купить хлеб".');
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  const parsed = parseReminderText(text);
  if (!parsed) return;

  const { time, unitWord, delaySeconds, task } = parsed;

  scheduleReminder(delaySeconds, () => {
    bot.sendMessage(chatId, `Напоминаю: ${task}`);
  });

  bot.sendMessage(chatId, `Окей! Напомню через ${time} ${unitWord}.`);
});
