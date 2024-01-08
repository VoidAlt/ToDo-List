const { Telegraf } = require('telegraf');

const bot = new Telegraf('6877749780:AAGE2F3qfwX_NcrNFmx5N2DfcwByrpMgCvo');

// Start command
bot.command('start', (ctx) => {
    const telegraphPictureUrl = 'https://graph.org//file/c5503a0722c16e35ea672.jpg'; // Replace with your Telegraph picture URL
    const caption = 'Welcome to the Todo Bot! Manage your daily, monthly, and yearly tasks.';
    
    // Inline buttons for /start command
    const inlineButtons = [
        { text: 'Help', callback_data: 'help' },
        { text: 'About', callback_data: 'about' }
    ];

    // Delete previous message if available
    if (ctx.message) {
        ctx.deleteMessage();
    }

    // Send Telegraph picture with caption and buttons
    ctx.replyWithPhoto({ url: telegraphPictureUrl }, { caption, reply_markup: { inline_keyboard: [inlineButtons] } });
});

// Handle inline button callbacks
bot.action('help', (ctx) => {
    const helpMessage = 'Click the button below to add tasks.';
    const addTasksButton = [{ text: 'Add Tasks', callback_data: 'addTasks' }];

    // Delete previous message if available
    if (ctx.message) {
        ctx.deleteMessage();
    }

    ctx.reply(helpMessage, { reply_markup: { inline_keyboard: [addTasksButton] } });
});

bot.action('addTasks', (ctx) => {
    const addTasksMessage = 'Give your To-Do list. Separate tasks on the basis of daily, monthly, and yearly using new lines.';
    
    // Delete previous message if available
    if (ctx.message) {
        ctx.deleteMessage();
    }

    ctx.reply(addTasksMessage);
});

// Handle text message for adding tasks
bot.on('text', (ctx) => {
    const tasks = ctx.message.text.split('\n');

    // Process the tasks (you can store them in a database or use any logic you prefer)
    // For example, let's assume you have a function to add tasks to different lists
    processTasks(tasks);

    ctx.reply('Tasks added successfully!');
});

// Helper function to process tasks (adjust this according to your needs)
function processTasks(tasks) {
    // Process tasks and add them to appropriate lists (daily, monthly, yearly)
    // Example logic: You can store tasks in a database or use any data structure
    // For demonstration, let's just log the tasks
    console.log('Tasks:', tasks);
}

// List module for showing and deleting tasks
bot.command('list', (ctx) => {
    // Implement logic to retrieve and display tasks
    // For demonstration, let's show a sample list
    const sampleList = [
        { serialNumber: 1, task: 'Sample Task 1' },
        { serialNumber: 2, task: 'Sample Task 2' },
        { serialNumber: 3, task: 'Sample Task 3' }
    ];

    const listMessage = 'Your To-Do List:\n' + sampleList.map(item => `${item.serialNumber}. ${item.task}`).join('\n');
    const deleteButton = [{ text: 'Delete a Task', callback_data: 'deleteTask' }];

    // Delete previous message if available
    if (ctx.message) {
        ctx.deleteMessage();
    }

    ctx.reply(listMessage, { reply_markup: { inline_keyboard: [deleteButton] } });
});

// Handle inline button for deleting tasks
bot.action('deleteTask', (ctx) => {
    const deleteMessage = 'Enter the serial number of the task you want to delete.';

    // Delete previous message if available
    if (ctx.message) {
        ctx.deleteMessage();
    }

    ctx.reply(deleteMessage);
});

// Handle text message for deleting a task
bot.on('text', (ctx) => {
    const serialNumberToDelete = parseInt(ctx.message.text);

    // Implement logic to delete the task with the given serial number
    // For demonstration, let's just log the serial number
    console.log('Task to delete:', serialNumberToDelete);

    ctx.reply(`Task ${serialNumberToDelete} deleted successfully!`);
});

// ... (your existing code)

// Launch the bot
bot.launch();
