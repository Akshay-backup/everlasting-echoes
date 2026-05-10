import { useEffect, useRef, useState } from "react";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";
import { wedding } from "@/data/wedding";

const DEFAULT_VOL = 0.45;

export function MusicPlayer({ autoStart }: { autoStart: boolean }) {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(DEFAULT_VOL);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!autoStart || !ref.current) return;
    ref.current.volume = 0;
    ref.current
      .play()
      .then(() => {
        setPlaying(true);
        let v = 0;
        const id = setInterval(() => {
          v += 0.04;
          if (!ref.current) return clearInterval(id);
          if (v >= DEFAULT_VOL) {
            ref.current.volume = DEFAULT_VOL;
            clearInterval(id);
          } else ref.current.volume = v;
        }, 120);
      })
      .catch(() => setPlaying(false));
  }, [autoStart]);

  useEffect(() => {
    if (ref.current) ref.current.volume = volume;
  }, [volume]);

  const togglePlay = () => {
    if (!ref.current) return;
    if (playing) {
      ref.current.pause();
      setPlaying(false);
    } else {
      ref.current.volume = volume || DEFAULT_VOL;
      if (!volume) setVolume(DEFAULT_VOL);
      ref.current.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  const muted = !playing || volume === 0;

  return (
    <>
      <audio ref={ref} src={wedding.audioUrl} loop preload="auto" />
      <div className="fixed bottom-6 right-6 z-50 flex items-end gap-2">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, x: 12, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 12, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="glass shadow-soft rounded-full pl-4 pr-3 py-2.5 flex items-center gap-3"
            >
              <button
                onClick={togglePlay}
                className="font-body text-[10px] tracking-[0.3em] uppercase text-foreground/80 hover:text-secondary transition-colors"
              >
                {playing ? "Pause" : "Play"}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) => {
                  const v = parseFloat(e.target.value);
                  setVolume(v);
                  if (v > 0 && !playing) togglePlay();
                }}
                aria-label="Music volume"
                className="w-28 accent-[var(--secondary)] h-1 cursor-pointer"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Music settings"
          className="relative h-12 w-12 rounded-full glass shadow-soft grid place-items-center text-primary hover:text-secondary transition-colors"
        >
          <span
            className={`absolute inset-0 rounded-full ${
              playing && !muted ? "animate-ping bg-accent/30" : ""
            }`}
          />
          {muted ? (
            <HiVolumeOff className="text-xl relative" />
          ) : (
            <HiVolumeUp className="text-xl relative" />
          )}
        </button>
      </div>
    </>
  );
}
