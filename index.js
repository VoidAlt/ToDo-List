const { Telegraf } = require('telegraf');
const config = require('./config.json');
const dailyModule = require('./modules/daily');
const monthlyModule = require('./modules/monthly');
const yearlyModule = require('./modules/yearly');
const listModule = require('./modules/list');

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
});

const bot = new Telegraf(config.telegramToken);

const port = process.env.PORT || 3000;
bot.startWebhook('/path-to-webhook', null, port);

// Start command
// ... (your existing code)

// Start command
bot.command('start', (ctx) => {
    const telegraphPictureUrl = 'https://example.com/telegraph_picture.jpg'; // Replace with your Telegraph picture URL
    const caption = 'Welcome to the Todo Bot! Manage your daily, monthly, and yearly tasks.';
    
    // Inline buttons for /start command
    const inlineButtons = [
        { text: 'Help', callback_data: 'help' },
        { text: 'About', callback_data: 'about' }
    ];

    // Send Telegraph picture with caption and buttons
    ctx.replyWithPhoto({ url: telegraphPictureUrl }, { caption, reply_markup: { inline_keyboard: [inlineButtons] } });
});

// Handle inline button callbacks
bot.action('help', (ctx) => {
    const helpMessage = 'This is the help message. Click the button below to add tasks.';
    const addTasksButton = [{ text: 'Add Tasks', callback_data: 'addTasks' }];

    ctx.reply(helpMessage, { reply_markup: { inline_keyboard: [addTasksButton] } });
});

bot.action('about', (ctx) => {
    const aboutMessage = 'This is the Todo Bot. It helps you manage your tasks. Click the buttons below for more information.';
    const buttonWithUrl = [{ text: 'Visit Website', url: 'https://example.com' }];
    const openMessageButton = [{ text: 'Open Another Message', callback_data: 'openAnotherMessage' }];

    ctx.reply(aboutMessage, { reply_markup: { inline_keyboard: [buttonWithUrl, buttonWithUrl, openMessageButton] } });
});

bot.action('addTasks', (ctx) => {
    const addTasksMessage = 'Choose a category to add tasks:';
    const dailyButton = [{ text: 'Daily', callback_data: 'addDailyTask' }];
    const monthlyButton = [{ text: 'Monthly', callback_data: 'addMonthlyTask' }];
    const yearlyButton = [{ text: 'Yearly', callback_data: 'addYearlyTask' }];

    ctx.reply(addTasksMessage, { reply_markup: { inline_keyboard: [dailyButton, monthlyButton, yearlyButton] } });
});

// ... (your existing code)

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
