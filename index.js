bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (/через (\d+) (минут[а]?|час[аов]?)/.test(text)) {
    const [, time, unit] = text.match(/через (\d+) (минут[а]?|час[аов]?)/);
    const minutes = unit.startsWith('час') ? parseInt(time) * 60 : parseInt(time);

    const task = text.replace(/напомни через \d+ (?:минут[а]?|час[аов]?)\s*/i, '');

    scheduleReminder(minutes, () => {
      bot.sendMessage(chatId, `Напоминаю: ${task}`);
    });

    bot.sendMessage(chatId, `Окей! Напомню через ${minutes} минут.`);
  }
});
