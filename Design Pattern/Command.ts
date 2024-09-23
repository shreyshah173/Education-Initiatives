import readline from 'readline';

interface Command {
    execute(): void;
    undo(): void;
}

class Light {
    private isOn: boolean = false;

    public toggle(): void {
        this.isOn = !this.isOn;
        console.log(this.isOn ? "The light is ON" : "The light is OFF");
    }
}

class TV {
    private isOn: boolean = false;

    public toggle(): void {
        this.isOn = !this.isOn;
        console.log(this.isOn ? "The TV is ON" : "The TV is OFF");
    }
}

class ToggleCommand implements Command {
    private device: { toggle: () => void };

    constructor(device: { toggle: () => void }) {
        this.device = device;
    }

    public execute(): void {
        this.device.toggle();
    }

    public undo(): void {
        this.device.toggle();
    }
}

class RemoteControl {
    private commands: Command[];
    private lastCommand: Command | null = null;

    constructor() {
        this.commands = [];
    }

    public setCommand(slot: number, command: Command): void {
        this.commands[slot] = command;
    }

    public pressButton(slot: number): void {
        if (this.commands[slot]) {
            this.commands[slot].execute();
            this.lastCommand = this.commands[slot];
        }
    }

    public pressUndoButton(): void {
        if (this.lastCommand) {
            this.lastCommand.undo();
        }
    }
}

class HomeAutomationApp {
    private livingRoomLight: Light;
    private tv: TV;
    private remoteControl: RemoteControl;

    constructor() {
        this.livingRoomLight = new Light();
        this.tv = new TV();
        this.remoteControl = new RemoteControl();

        const lightToggle = new ToggleCommand(this.livingRoomLight);
        const tvToggle = new ToggleCommand(this.tv);

        this.remoteControl.setCommand(0, lightToggle);
        this.remoteControl.setCommand(1, tvToggle);
    }

    public run(): void {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        console.log("Welcome to the Home Automation App!");
        this.displayMenu();

        rl.on('line', (input) => {
            this.handleInput(input);
            this.displayMenu();
        });
    }

    private displayMenu(): void {
        console.log("\nChoose an option:");
        console.log("1. Toggle light");
        console.log("2. Toggle TV");
        console.log("3. Undo last command");
        console.log("4. Exit");
    }

    private handleInput(input: string): void {
        switch (input) {
            case '1':
                this.remoteControl.pressButton(0);
                break;
            case '2':
                this.remoteControl.pressButton(1);
                break;
            case '3':
                this.remoteControl.pressUndoButton();
                break;
            case '4':
                console.log("Exiting Home Automation App...");
                process.exit(0);
            default:
                console.log("Invalid input. Please try again.");
        }
    }
}

const app = new HomeAutomationApp();
app.run();
