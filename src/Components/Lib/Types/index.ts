export interface Task {
    id: number;
    title: string;
    description: string;
    status: string;
}
export interface CreateTaskProps {
    addTask: (task: Task) => void;
}
export interface ReadTaskProps {
    tasks: Task[];
    deleteTask: (taskId: number) => void;
    updateTask: (updatedTask: Task) => void;
}