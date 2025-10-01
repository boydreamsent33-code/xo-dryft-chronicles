import { useState, useRef, useEffect } from "react";
import { Music, Pause, Play, SkipForward, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import track1 from "@/assets/come-on.mp3";
import track2 from "@/assets/3am.mp3";

const tracks = [
  { title: "Come On", src: track1 },
  { title: "3am", src: track2 },
];

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      // Auto-play next track
      setCurrentTrack((prev) => (prev + 1) % tracks.length);
    };

    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrack]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
    setIsPlaying(true);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-6 right-6 z-50 p-3 bg-primary/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-primary transition-all"
        aria-label="Show music player"
      >
        <Music className="w-5 h-5 text-primary-foreground" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-card/95 backdrop-blur-sm border rounded-lg shadow-xl p-4 min-w-[280px] animate-scale-in">
      <audio
        ref={audioRef}
        src={tracks[currentTrack].src}
        preload="metadata"
      />
      
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Music className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">Now Playing</span>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Minimize player"
        >
          ×
        </button>
      </div>

      <div className="mb-3">
        <p className="text-sm font-semibold truncate">{tracks[currentTrack].title}</p>
        <p className="text-xs text-muted-foreground">XO DRYFT</p>
      </div>

      <div className="flex items-center justify-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMute}
          className="h-8 w-8"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <VolumeX className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
        </Button>
        
        <Button
          variant="default"
          size="icon"
          onClick={togglePlay}
          className="h-10 w-10"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5 ml-0.5" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={nextTrack}
          className="h-8 w-8"
          aria-label="Next track"
        >
          <SkipForward className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default BackgroundMusic;
