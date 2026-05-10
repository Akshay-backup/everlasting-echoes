import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { wedding } from "@/data/wedding";

export function Preloader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    let val = 0;
    const id = setInterval(() => {
      val += 2 + Math.random() * 6;
      if (val >= 100) {
        val = 100;
        clearInterval(id);
        setTimeout(() => {
          setHide(true);
          setTimeout(onDone, 900);
        }, 500);
      }
      setProgress(Math.floor(val));
    }, 80);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!hide && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background grain"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(20px)" }}
          transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative flex items-center gap-6 sm:gap-10"
          >
            <span className="font-display text-7xl sm:text-9xl text-primary">
              {wedding.bride.initial}
            </span>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.4, delay: 0.3, ease: "easeOut" }}
              className="font-script text-4xl sm:text-6xl text-secondary origin-center"
            >
              &amp;
            </motion.span>
            <span className="font-display text-7xl sm:text-9xl text-primary">
              {wedding.groom.initial}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-10 sm:mt-14 flex flex-col items-center gap-3"
          >
            <div className="h-px w-44 bg-border overflow-hidden">
              <div
                className="h-full bg-primary transition-[width] duration-200 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="font-body text-xs tracking-[0.4em] text-muted-foreground">
              {String(progress).padStart(3, "0")}
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="absolute bottom-10 font-body text-[10px] sm:text-xs tracking-[0.5em] text-muted-foreground uppercase"
          >
            A Love Story · {wedding.shortDate}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
