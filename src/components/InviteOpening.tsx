import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { wedding } from "@/data/wedding";
import { playSealCrack, playPaperSlide } from "@/lib/sfx";

export function InviteOpening({ onDone }: { onDone: () => void }) {
  const [opened, setOpened] = useState(false);
  const [hide, setHide] = useState(false);

  const open = () => {
    if (opened) return;
    setOpened(true);
    // SFX: wax crack immediately, paper slide as the letter rises
    playSealCrack(0.32);
    setTimeout(() => playPaperSlide(0.22, 1.4), 380);
    setTimeout(() => setHide(true), 4200);
    setTimeout(onDone, 4900);
  };

  return (
    <AnimatePresence>
      {!hide && (
        <motion.div
          className="fixed inset-0 z-[95] flex items-center justify-center bg-background grain overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Soft radial vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 0%, oklch(0.22 0.03 130 / 0.35) 100%)",
            }}
          />

          {/* Envelope */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
            style={{ perspective: "1400px" }}
          >
            <motion.div
              className="relative w-[78vw] max-w-[420px] aspect-[3/2] cursor-pointer"
              animate={
                opened
                  ? { y: -40, scale: 1.04, rotateX: 4 }
                  : { y: [0, -6, 0], scale: 1, rotateX: 0 }
              }
              transition={
                opened
                  ? { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
                  : { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }
              onClick={open}
            >
              {/* Envelope body */}
              <div
                className="absolute inset-0 rounded-sm shadow-[0_30px_80px_-30px_rgba(0,0,0,0.45)]"
                style={{
                  background:
                    "linear-gradient(160deg, oklch(0.93 0.025 95) 0%, oklch(0.88 0.04 90) 100%)",
                  border: "1px solid oklch(0.82 0.06 85 / 0.6)",
                }}
              />

              {/* Bottom triangle (inner) */}
              <svg
                viewBox="0 0 300 200"
                className="absolute inset-0 w-full h-full pointer-events-none"
                preserveAspectRatio="none"
              >
                <polygon
                  points="0,0 300,0 150,110"
                  fill="oklch(0.85 0.05 90)"
                  opacity="0.55"
                />
              </svg>

              {/* Letter that slides up after open */}
              <motion.div
                className="absolute left-[8%] right-[8%] top-[14%] bottom-[14%] rounded-sm bg-card shadow-[0_10px_30px_-10px_rgba(0,0,0,0.25)] flex flex-col items-center justify-center px-4 z-20"
                initial={{ y: 0 }}
                animate={opened ? { y: "-115%" } : { y: 0 }}
                transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
              >
                <span className="font-body text-[9px] tracking-[0.5em] uppercase text-muted-foreground">
                  The Wedding of
                </span>
                <div className="mt-2 flex items-center gap-3 font-display text-3xl text-primary whitespace-nowrap">
                  <span>{wedding.bride.name}</span>
                  <span className="font-script text-secondary text-2xl">&amp;</span>
                  <span>{wedding.groom.name}</span>
                </div>
                <span className="mt-2 font-body text-[9px] tracking-[0.4em] uppercase text-muted-foreground">
                  {wedding.shortDate}
                </span>
              </motion.div>

              {/* Top flap (folds open) */}
              <motion.div
                className="absolute inset-x-0 top-0 h-full origin-top pointer-events-none"
                style={{ transformStyle: "preserve-3d" }}
                initial={{ rotateX: 0 }}
                animate={opened ? { rotateX: -180 } : { rotateX: 0 }}
                transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
              >
                <svg
                  viewBox="0 0 300 200"
                  className="w-full h-full"
                  preserveAspectRatio="none"
                >
                  <polygon
                    points="0,0 300,0 150,110"
                    fill="oklch(0.9 0.04 90)"
                    stroke="oklch(0.72 0.09 75)"
                    strokeWidth="1"
                  />
                </svg>
              </motion.div>

              {/* Wax seal */}
              <motion.div
                className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 z-10"
                animate={opened ? { scale: 0, opacity: 0, rotate: 30 } : { scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div
                  className="h-14 w-14 rounded-full grid place-items-center shadow-[0_6px_18px_-4px_rgba(0,0,0,0.4)]"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, oklch(0.62 0.2 27), oklch(0.42 0.16 27))",
                    border: "1px solid oklch(0.35 0.14 27)",
                  }}
                >
                  <span className="font-script text-ivory text-2xl leading-none drop-shadow">
                    {wedding.bride.initial}
                    {wedding.groom.initial}
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* Tap hint */}
            <motion.button
              onClick={open}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: opened ? 0 : 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="absolute left-1/2 -translate-x-1/2 -bottom-20 flex flex-col items-center gap-2 text-foreground/70"
            >
              <span className="font-body text-[10px] tracking-[0.5em] uppercase">
                Tap to open
              </span>
              <span className="h-px w-10 bg-foreground/40" />
            </motion.button>
          </motion.div>

          {/* Reveal flash */}
          <motion.div
            className="absolute inset-0 bg-ivory pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: opened ? [0, 0.9, 0] : 0 }}
            transition={{ duration: 1.6, times: [0, 0.6, 1], delay: 0.6 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
