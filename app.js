import { addTask, completeTask, filterByStatus } from "./model.js";
const taskForm = document.getElementById("taskForm");
const taskTitle = document.getElementById("taskTitle");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const emptyMessage = document.getElementById("emptyMessage");
const filterButtons = document.querySelectorAll("[data-filter]");
let tasks = [];
let activeFilter = "all";
function renderTasks() {
    taskList.replaceChildren();
    const visibleTasks = activeFilter === "all"
        ? tasks
        : filterByStatus(tasks, activeFilter);
    taskCount.textContent = `${tasks.length} task${tasks.length === 1 ? "" : "s"}`;
    emptyMessage.hidden = visibleTasks.length > 0;
    for (const task of visibleTasks) {
        const item = document.createElement("li");
        item.className = "task-item";
        const info = document.createElement("div");
        info.className = "task-info";
        const title = document.createElement("p");
        title.className = "task-title";
        title.textContent = task.title;
        const badge = document.createElement("span");
        badge.className = `task-status status-${task.status}`;
        badge.textContent = task.status;
        info.append(title, badge);
        const button = document.createElement("button");
        button.type = "button";
        button.className = "advance-button";
        button.textContent = task.status === "done" ? "Completed" : "Complete";
        button.disabled = task.status === "done";
        button.addEventListener("click", () => {
            tasks = completeTask(tasks, task.id);
            renderTasks();
        });
        item.append(info, button);
        taskList.append(item);
    }
}
taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = taskTitle.value.trim();
    if (title.length === 0) {
        return;
    }
    tasks = addTask(tasks, title);
    taskTitle.value = "";
    renderTasks();
});
filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;
        if (filter === "all" ||
            filter === "todo" ||
            filter === "in-progress" ||
            filter === "done") {
            activeFilter = filter;
        }
        filterButtons.forEach((filterButton) => {
            filterButton.classList.toggle("active", filterButton === button);
        });
        renderTasks();
    });
});
renderTasks();
