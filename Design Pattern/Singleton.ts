import readline from 'readline';

// Singleton Logger
class Logger {
    private static instance: Logger | null = null;

    private constructor() {
        // private constructor prevents direct instantiation
    }

    public static getInstance(): Logger {
        if (Logger.instance === null) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    public log(message: string): void {
        console.log(`Log: ${message}`);
    }
}

// Client code demonstrating Singleton behavior
class Application {
    private rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    public run(): void {
        this.displayMenu();
    }

    private displayMenu(): void {
        console.log("\nLogger Menu:");
        console.log("1. Log a message");
        console.log("2. Exit");
        this.rl.question("Select an option (1-2): ", (input) => {
            this.handleMenuSelection(input);
        });
    }

    private handleMenuSelection(input: string): void {
        switch (input) {
            case '1':
                this.askForLogMessage();
                break;
            case '2':
                this.exit();
                break;
            default:
                console.log("Invalid input, please try again.");
                this.displayMenu();
                break;
        }
    }

    private askForLogMessage(): void {
        this.rl.question("Enter the log message: ", (message) => {
            const logger = Logger.getInstance();
            logger.log(message);
            console.log("Message logged successfully.");
            this.displayMenu();
        });
    }

    private exit(): void {
        console.log("Exiting Application...");
        this.rl.close();
    }
}

// Start the application
const app = new Application();
app.run();
