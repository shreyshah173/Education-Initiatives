// Subsystem Classes
class TV {
    public on(): void {
        console.log("TV is now ON.");
    }

    public off(): void {
        console.log("TV is now OFF.");
    }
}

class DVDPlayer {
    public on(): void {
        console.log("DVD Player is now ON.");
    }

    public off(): void {
        console.log("DVD Player is now OFF.");
    }

    public play(movie: string): void {
        console.log(`Playing movie: ${movie}`);
    }
}

class SoundSystem {
    public on(): void {
        console.log("Sound System is now ON.");
    }

    public off(): void {
        console.log("Sound System is now OFF.");
    }

    public setVolume(volume: number): void {
        console.log(`Setting volume to ${volume}.`);
    }
}

// Facade Class
class HomeTheaterFacade {
    private tv: TV;
    private dvdPlayer: DVDPlayer;
    private soundSystem: SoundSystem;

    constructor() {
        this.tv = new TV();
        this.dvdPlayer = new DVDPlayer();
        this.soundSystem = new SoundSystem();
    }

    public watchMovie(movie: string): void {
        this.tv.on();
        this.soundSystem.on();
        this.soundSystem.setVolume(5);
        this.dvdPlayer.on();
        this.dvdPlayer.play(movie);
    }

    public endMovie(): void {
        this.dvdPlayer.off();
        this.soundSystem.off();
        this.tv.off();
        console.log("Movie ended.");
    }
}

// Client code
const homeTheater = new HomeTheaterFacade();
homeTheater.watchMovie("Inception"); // Setting up the home theater system
homeTheater.endMovie(); // Turning off the home theater system
