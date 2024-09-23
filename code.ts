import readline from 'readline';

// Command Interface
interface Command {
    execute(): void;
    undo(): void;
}

// Receiver - Light
class Light {
    private isOn: boolean = false;

    public on(): void {
        this.isOn = true;
        console.log("The light is ON");
    }

    public off(): void {
        this.isOn = false;
        console.log("The light is OFF");
    }
}

// Receiver - TV
class TV {
    private isOn: boolean = false;

    public on(): void {
        this.isOn = true;
        console.log("The TV is ON");
    }

    public off(): void {
        this.isOn = false;
        console.log("The TV is OFF");
    }
}

// Concrete Command - LightOnCommand
class LightOnCommand implements Command {
    private light: Light;

    constructor(light: Light) {
        this.light = light;
    }

    public execute(): void {
        this.light.on();
    }

    public undo(): void {
        this.light.off();
    }
}

// Concrete Command - LightOffCommand
class LightOffCommand implements Command {
    private light: Light;

    constructor(light: Light) {
        this.light = light;
    }

    public execute(): void {
        this.light.off();
    }

    public undo(): void {
        this.light.on();
    }
}

// Concrete Command - TVOnCommand
class TVOnCommand implements Command {
    private tv: TV;

    constructor(tv: TV) {
        this.tv = tv;
    }

    public execute(): void {
        this.tv.on();
    }

    public undo(): void {
        this.tv.off();
    }
}

// Concrete Command - TVOffCommand
class TVOffCommand implements Command {
    private tv: TV;

    constructor(tv: TV) {
        this.tv = tv;
    }

    public execute(): void {
        this.tv.off();
    }

    public undo(): void {
        this.tv.on();
    }
}

// Invoker - RemoteControl
class RemoteControl {
    private onCommands: Command[];
    private offCommands: Command[];
    private lastCommand: Command | null = null;

    constructor() {
        this.onCommands = [];
        this.offCommands = [];
    }

    public setCommand(slot: number, onCommand: Command, offCommand: Command): void {
        this.onCommands[slot] = onCommand;
        this.offCommands[slot] = offCommand;
    }

    public pressOnButton(slot: number): void {
        if (this.onCommands[slot]) {
            this.onCommands[slot].execute();
            this.lastCommand = this.onCommands[slot];
        }
    }

    public pressOffButton(slot: number): void {
        if (this.offCommands[slot]) {
            this.offCommands[slot].execute();
            this.lastCommand = this.offCommands[slot];
        }
    }

    public pressUndoButton(): void {
        if (this.lastCommand) {
            this.lastCommand.undo();
        }
    }
}

// Home Automation App
class HomeAutomationApp {
    private livingRoomLight: Light;
    private tv: TV;
    private remoteControl: RemoteControl;

    constructor() {
        this.livingRoomLight = new Light();
        this.tv = new TV();
        this.remoteControl = new RemoteControl();

        const lightOn = new LightOnCommand(this.livingRoomLight);
        const lightOff = new LightOffCommand(this.livingRoomLight);
        const tvOn = new TVOnCommand(this.tv);
        const tvOff = new TVOffCommand(this.tv);

        this.remoteControl.setCommand(0, lightOn, lightOff);
        this.remoteControl.setCommand(1, tvOn, tvOff);
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
        console.log("1. Turn on light");
        console.log("2. Turn off light");
        console.log("3. Turn on TV");
        console.log("4. Turn off TV");
        console.log("5. Undo last command");
        console.log("6. Exit");
    }

    private handleInput(input: string): void {
        switch (input) {
            case '1':
                this.remoteControl.pressOnButton(0);
                break;
            case '2':
                this.remoteControl.pressOffButton(0);
                break;
            case '3':
                this.remoteControl.pressOnButton(1);
                break;
            case '4':
                this.remoteControl.pressOffButton(1);
                break;
            case '5':
                this.remoteControl.pressUndoButton();
                break;
            case '6':
                console.log("Exiting Home Automation App...");
                process.exit(0);
            default:
                console.log("Invalid input. Please try again.");
        }
    }
}

// Start the app
const app = new HomeAutomationApp();
app.run();