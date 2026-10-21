// Adds a new task without modifying the original array.
export function addTask(tasks, title) {
    const newId = tasks.length === 0
        ? 1
        : Math.max(...tasks.map((task) => task.id)) + 1;
    const newTask = {
        id: newId,
        title: title,
        status: "todo",
    };
    return [...tasks, newTask];
}
// Marks the matching task as done.
export function completeTask(tasks, id) {
    return tasks.map((task) => task.id === id ? { ...task, status: "done" } : task);
}
// Returns tasks with the requested status.
export function filterByStatus(tasks, status) {
    return tasks.filter((task) => task.status === status);
}
// Original extra operation: deletes a task by its ID.
export function deleteTask(tasks, id) {
    return tasks.filter((task) => task.id !== id);
}
