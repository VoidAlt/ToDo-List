// modules/list.js
const daily = require('./daily');
const monthly = require('./monthly');
const yearly = require('./yearly');

module.exports = {
    handleListCommand: (ctx) => {
        const userId = ctx.from.id;
        const dailyTasks = daily.getTasks(userId);
        const monthlyTasks = monthly.getTasks(userId);
        const yearlyTasks = yearly.getTasks(userId);

        let message = 'Your Todo Lists:\n\n';

        if (dailyTasks.length > 0) {
            message += 'Daily Tasks:\n';
            message += formatTasks(dailyTasks);
            message += '\n';
        }

        if (monthlyTasks.length > 0) {
            message += 'Monthly Tasks:\n';
            message += formatTasks(monthlyTasks);
            message += '\n';
        }

        if (yearlyTasks.length > 0) {
            message += 'Yearly Tasks:\n';
            message += formatTasks(yearlyTasks);
            message += '\n';
        }

        ctx.reply(message, { reply_markup: getInlineButtons(userId) });
    },
    // Add other functionalities as needed
};

function formatTasks(tasks) {
    return tasks.map((task, index) => `${index + 1}. ${task}`).join('\n');
}

function getInlineButtons(userId) {
    return {
        inline_keyboard: [
            [{ text: 'Remove Completed Tasks', callback_data: `removeTasks_${userId}` }],
            [{ text: 'Add Task', callback_data: `addTask_${userId}` }]
        ]
    };
            }
