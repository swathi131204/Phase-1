const fs = require('fs').promises;
const path = require('path');

const TASKS_FILE = path.join(process.cwd(), 'tasks.json');

async function loadTasks() {
    try {
        const data = await fs.readFile(TASKS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

async function saveTasks(tasks) {
    await fs.writeFile(TASKS_FILE, JSON.stringify(tasks, null, 2));
}

async function addTask(title, description, dueDate) {
    const tasks = await loadTasks();
    const newTask = { id: Date.now(), title, description, status: 'pending', dueDate };
    tasks.push(newTask);
    await saveTasks(tasks);
    console.log('Task added successfully!');
}

async function listTasks(filter) {
    const tasks = await loadTasks();
    let filteredTasks = tasks;
    if (filter) {
        filteredTasks = tasks.filter(task => task.status === filter);
    }
    console.log(filteredTasks.length ? filteredTasks : 'No tasks found');
}

async function updateTask(id, updates) {
    let tasks = await loadTasks();
    tasks = tasks.map(task => task.id === id ? { ...task, ...updates } : task);
    await saveTasks(tasks);
    console.log('Task updated successfully!');
}

async function deleteTask(id) {
    let tasks = await loadTasks();
    tasks = tasks.filter(task => task.id !== id);
    await saveTasks(tasks);
    console.log('Task deleted successfully!');
}

const [,, command, ...args] = process.argv;

(async () => {
    switch (command) {
        case 'add':
            await addTask(args[0], args[1], args[2]);
            break;
        case 'list':
            await listTasks(args[0]);
            break;
        case 'update':
            await updateTask(Number(args[0]), { title: args[1], description: args[2], status: args[3] });
            break;
        case 'delete':
            await deleteTask(Number(args[0]));
            break;
        default:
            console.log('Invalid command! Use add, list, update, or delete.');
    }
})();
