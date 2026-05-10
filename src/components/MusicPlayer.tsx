import { useEffect, useRef, useState } from "react";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { wedding } from "@/data/wedding";

export function MusicPlayer({ autoStart }: { autoStart: boolean }) {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!autoStart || !ref.current) return;
    ref.current.volume = 0;
    ref.current
      .play()
      .then(() => {
        setPlaying(true);
        // fade in
        let v = 0;
        const id = setInterval(() => {
          v += 0.04;
          if (!ref.current) return clearInterval(id);
          if (v >= 0.45) {
            ref.current.volume = 0.45;
            clearInterval(id);
          } else ref.current.volume = v;
        }, 120);
      })
      .catch(() => setPlaying(false));
  }, [autoStart]);

  const toggle = () => {
    if (!ref.current) return;
    if (playing) {
      ref.current.pause();
      setPlaying(false);
    } else {
      ref.current.volume = 0.45;
      ref.current.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <>
      <audio ref={ref} src={wedding.audioUrl} loop preload="auto" />
      <button
        onClick={toggle}
        aria-label={playing ? "Mute music" : "Play music"}
        className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full glass shadow-soft grid place-items-center text-primary hover:text-secondary transition-colors"
      >
        <span className={`absolute inset-0 rounded-full ${playing ? "animate-ping bg-accent/30" : ""}`} />
        {playing ? <HiVolumeUp className="text-xl relative" /> : <HiVolumeOff className="text-xl relative" />}
      </button>
    </>
  );
}
