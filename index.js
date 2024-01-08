const { Telegraf } = require('telegraf');
const config = require('./config.json');
const dailyModule = require('./modules/daily');
const monthlyModule = require('./modules/monthly');
const yearlyModule = require('./modules/yearly');
const listModule = require('./modules/list');

const bot = new Telegraf(config.telegramToken);

// Start command
bot.command('start', (ctx) => {
    const telegraphPictureUrl = 'https://graph.org//file/c8bded707a90e923fe757.jpg'; // Replace with your Telegraph picture URL
    const caption = 'Welcome to the Todo Bot! Manage your daily, monthly, and yearly tasks.';
    
    // Send Telegraph picture with caption and buttons
    ctx.replyWithPhoto({ url: telegraphPictureUrl }, { caption, reply_markup: getStartButtons() });
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

// Example usage of the modules
bot.command('daily', (ctx) => dailyModule.handleDailyCommand(ctx));
bot.command('monthly', (ctx) => monthlyModule.handleMonthlyCommand(ctx));
bot.command('yearly', (ctx) => yearlyModule.handleYearlyCommand(ctx));
bot.command('list', (ctx) => listModule.handleListCommand(ctx));

// Handle inline button callbacks
bot.action(/removeTasks_(\d+)/, (ctx) => {
    const userId = parseInt(ctx.match[1]);
    // Implement logic to remove completed tasks for the specified user
    ctx.answerCbQuery(`Removed completed tasks for user ${userId}`);
});

bot.action(/addTask_(\d+)/, (ctx) => {
    const userId = parseInt(ctx.match[1]);
    // Implement logic to add a task for the specified user
    ctx.answerCbQuery(`Added a task for user ${userId}`);
});

// Start the bot
bot.launch();
