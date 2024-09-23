// Target Interface
interface MediaPlayer {
    play(mediaType: string, fileName: string): void;
}

// Adaptee Class
class VLCPlayer {
    public playVLC(fileName: string): void {
        console.log(`Playing VLC file: ${fileName}`);
    }
}

// Adapter Class
class MediaAdapter implements MediaPlayer {
    private vlcPlayer: VLCPlayer;

    constructor() {
        this.vlcPlayer = new VLCPlayer();
    }

    public play(mediaType: string, fileName: string): void {
        if (mediaType === 'vlc') {
            this.vlcPlayer.playVLC(fileName);
        }
    }
}

// Concrete Class
class AudioPlayer implements MediaPlayer {
    private mediaAdapter: MediaAdapter | null = null;

    public play(mediaType: string, fileName: string): void {
        if (mediaType === 'mp3') {
            console.log(`Playing MP3 file: ${fileName}`);
        } else if (mediaType === 'vlc') {
            this.mediaAdapter = new MediaAdapter();
            this.mediaAdapter.play(mediaType, fileName);
        } else {
            console.log("Invalid media type.");
        }
    }
}

// Client code
const audioPlayer = new AudioPlayer();
audioPlayer.play('mp3', 'song.mp3'); // Output: Playing MP3 file: song.mp3
audioPlayer.play('vlc', 'video.vlc'); // Output: Playing VLC file: video.vlc
