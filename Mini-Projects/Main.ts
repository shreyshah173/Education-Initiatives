// Task Class
class Task {
    constructor(
        public description: string,
        public startTime: string,
        public endTime: string,
        public priority: string
    ) {}
}

// TaskFactory Class
class TaskFactory {
    static createTask(description: string, startTime: string, endTime: string, priority: string): Task {
        return new Task(description, startTime, endTime, priority);
    }
}

// Observer Interface
interface Observer {
    notify(message: string): void;
}

// ScheduleManager Class (Singleton)
class ScheduleManager {
    private static instance: ScheduleManager | null = null;
    private tasks: Task[] = [];
    private observers: Observer[] = [];

    private constructor() {}

    public static getInstance(): ScheduleManager {
        if (ScheduleManager.instance === null) {
            ScheduleManager.instance = new ScheduleManager();
        }
        return ScheduleManager.instance;
    }

    public addObserver(observer: Observer): void {
        this.observers.push(observer);
    }

    public notifyObservers(message: string): void {
        for (const observer of this.observers) {
            observer.notify(message);
        }
    }

    public addTask(task: Task): string {
        if (!this.isValidTime(task.startTime) || !this.isValidTime(task.endTime)) {
            return "Error: Invalid time format.";
        }

        if (this.isTaskOverlapping(task)) {
            const conflictingTask = this.tasks.find(t => this.isOverlapping(t, task));
            return `Error: Task conflicts with existing task "${conflictingTask?.description}".`;
        }

        this.tasks.push(task);
        this.notifyObservers(`Task "${task.description}" added successfully.`);
        return "Task added successfully. No conflicts.";
    }

    public removeTask(description: string): string {
        const index = this.tasks.findIndex(task => task.description === description);
        if (index === -1) {
            return "Error: Task not found.";
        }
        this.tasks.splice(index, 1);
        this.notifyObservers(`Task "${description}" removed successfully.`);
        return "Task removed successfully.";
    }

    public viewTasks(): string {
        if (this.tasks.length === 0) {
            return "No tasks scheduled for the day.";
        }
        return this.tasks
            .sort((a, b) => a.startTime.localeCompare(b.startTime))
            .map(task => `${task.startTime} - ${task.endTime}: ${task.description} [${task.priority}]`)
            .join('\n');
    }

    private isTaskOverlapping(newTask: Task): boolean {
        return this.tasks.some(existingTask => this.isOverlapping(existingTask, newTask));
    }

    private isOverlapping(task1: Task, task2: Task): boolean {
        return (task1.startTime < task2.endTime && task2.startTime < task1.endTime);
    }

    private isValidTime(time: string): boolean {
        const regex = /^(2[0-3]|[01]?[0-9]):[0-5][0-9]$/; // Validates time in HH:MM format
        return regex.test(time);
    }
}

// Console Application
class ConsoleApp implements Observer {
    private scheduleManager: ScheduleManager;

    constructor() {
        this.scheduleManager = ScheduleManager.getInstance();
        this.scheduleManager.addObserver(this);
    }

    public run(): void {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        const showMenu = () => {
            console.log("\nMenu:");
            console.log("1. Add Task");
            console.log("2. Remove Task");
            console.log("3. View Tasks");
            console.log("4. Exit");
            readline.question("Choose an option: ", (option: string) => {
                this.handleOption(option, readline);
            });
        };

        showMenu();
    }

    private handleOption(option: string, readline: any): void {
        switch (option) {
            case '1':
                this.addTask(readline);
                break;
            case '2':
                this.removeTask(readline);
                break;
            case '3':
                this.viewTasks();
                break;
            case '4':
                console.log("Exiting the application...");
                readline.close();
                break;
            default:
                console.log("Invalid option. Please try again.");
                this.run();
        }
    }

    private addTask(readline: any): void {
        readline.question("Enter task description: ", (description: string) => {
            readline.question("Enter start time (HH:MM): ", (startTime: string) => {
                readline.question("Enter end time (HH:MM): ", (endTime: string) => {
                    readline.question("Enter priority level [Easy, Medium, Hard]: ", (priority: string) => {
                        const task = TaskFactory.createTask(description, startTime, endTime, priority);
                        console.log(this.scheduleManager.addTask(task));
                        this.run();
                    });
                });
            });
        });
    }

    private removeTask(readline: any): void {
        readline.question("Enter task description to remove: ", (description: string) => {
            console.log(this.scheduleManager.removeTask(description));
            this.run();
        });
    }

    private viewTasks(): void {
        console.log(this.scheduleManager.viewTasks());
        this.run();
    }

    notify(message: string): void {
        console.log(message);
    }
}

// Start the application
const app = new ConsoleApp();
app.run();
