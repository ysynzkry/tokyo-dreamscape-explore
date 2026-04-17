import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

// Free CC0 lofi loop hosted on Pixabay CDN (chill / city / night vibe).
const TRACK_URL =
  "https://cdn.pixabay.com/audio/2022/10/30/audio_347111d654.mp3";
const STORAGE_KEY = "tokyo:music";

export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  // Lazy-create the audio element on the client (avoids SSR window issues).
  useEffect(() => {
    const a = new Audio(TRACK_URL);
    a.loop = true;
    a.volume = 0.35;
    a.preload = "none";
    audioRef.current = a;
    setReady(true);

    // If the user previously enabled music in this browser, try to resume.
    if (typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY) === "on") {
      a.play()
        .then(() => setPlaying(true))
        .catch(() => {
          // Autoplay blocked — user will need to click the button once.
        });
    }

    return () => {
      a.pause();
      a.src = "";
      audioRef.current = null;
    };
  }, []);

  function toggle() {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
      if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, "off");
    } else {
      a.play()
        .then(() => {
          setPlaying(true);
          if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, "on");
        })
        .catch(() => {
          // Surface a quick visual hint — keep silent state.
          setPlaying(false);
        });
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={!ready}
      aria-label={playing ? "Mute Tokyo lofi" : "Play Tokyo lofi"}
      title={playing ? "Mute lofi" : "Play Tokyo lofi"}
      className={`group relative inline-flex h-9 w-9 items-center justify-center rounded-full border transition-all ${
        playing
          ? "border-neon-pink/70 bg-neon-pink/10 text-neon-pink shadow-[var(--shadow-neon-pink)]"
          : "border-border bg-background/50 text-muted-foreground hover:text-foreground"
      }`}
    >
      {playing ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
      {playing && (
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-neon-pink/30" />
      )}
    </button>
  );
}
