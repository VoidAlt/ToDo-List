// modules/monthly.js
let monthlyTasks = [];

module.exports = {
    addTask: (task) => {
        monthlyTasks.push(task);
    },
    getTasks: () => {
        return monthlyTasks;
    },
    // Add other functionalities as needed
};
