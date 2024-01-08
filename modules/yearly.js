// modules/yearly.js
let yearlyTasks = [];

module.exports = {
    addTask: (task) => {
        yearlyTasks.push(task);
    },
    getTasks: () => {
        return yearlyTasks;
    },
    // Add other functionalities as needed
};
