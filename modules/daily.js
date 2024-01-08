// modules/daily.js
let dailyTasks = [];

module.exports = {
    addTask: (task) => {
        dailyTasks.push(task);
    },
    getTasks: () => {
        return dailyTasks;
    },
    // Add other functionalities as needed
};
