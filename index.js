const { Telegraf } = require('telegraf');
const fs = require('fs');
const config = require('./config.json');

const bot = new Telegraf(config.telegramToken);

// Start command
bot.command('start', (ctx) => {
    const telegraphPicture = fs.readFileSync('./images/telegraph_picture.jpg');
    const caption = 'Welcome to the Todo Bot! Manage your daily, monthly, and yearly tasks.';
    
    // Send Telegraph picture with caption and buttons
    ctx.replyWithPhoto({ source: telegraphPicture }, { caption, reply_markup: getStartButtons() });
});

// Help command
bot.command('help', (ctx) => {
    const helpMessage = 'This Todo Bot helps you manage your tasks.\n\nCommands:\n/start - Start the bot\n/help - Show this help message\n/list - Manage your to-do lists';
    ctx.reply(helpMessage);
});

// Inline buttons for /start command
function getStartButtons() {
    return {
        inline_keyboard: [
            [{ text: 'Daily Tasks', callback_data: 'daily' }],
            [{ text: 'Monthly Tasks', callback_data: 'monthly' }],
            [{ text: 'Yearly Tasks', callback_data: 'yearly' }]
        ]
    };
}

// Handle button callbacks
bot.action('daily', (ctx) => ctx.answerCbQuery('Daily tasks selected'));
bot.action('monthly', (ctx) => ctx.answerCbQuery('Monthly tasks selected'));
bot.action('yearly', (ctx) => ctx.answerCbQuery('Yearly tasks selected'));

// Start the bot
bot.launch();
