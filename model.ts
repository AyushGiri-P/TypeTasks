
export type TaskStatus = "todo" | "in-progress" | "done";

export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
}

// Adds a new task without modifying the original array.
export function addTask(tasks: Task[], title: string): Task[] {
  const newId =
    tasks.length === 0
      ? 1
      : Math.max(...tasks.map((task) => task.id)) + 1;

  const newTask: Task = {
    id: newId,
    title: title,
    status: "todo",
  };

  return [...tasks, newTask];
}

// Marks the matching task as done.
export function completeTask(tasks: Task[], id: number): Task[] {
  return tasks.map((task) =>
    task.id === id ? { ...task, status: "done" } : task
  );
}

// Returns tasks with the requested status.
export function filterByStatus(
  tasks: Task[],
  status: TaskStatus
): Task[] {
  return tasks.filter((task) => task.status === status);
}

// Original extra operation: deletes a task by its ID.
export function deleteTask(tasks: Task[], id: number): Task[] {
  return tasks.filter((task) => task.id !== id);
}
