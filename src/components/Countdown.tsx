import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function diff(target: number) {
  const now = Date.now();
  const ms = Math.max(0, target - now);
  const days = Math.floor(ms / 86400000);
  const hours = Math.floor((ms / 3600000) % 24);
  const mins = Math.floor((ms / 60000) % 60);
  const secs = Math.floor((ms / 1000) % 60);
  return { days, hours, mins, secs };
}

export function Countdown({ iso }: { iso: string }) {
  const target = new Date(iso).getTime();
  const [t, setT] = useState(() => diff(target));
  useEffect(() => {
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const items = [
    { v: t.days, l: "Days" },
    { v: t.hours, l: "Hours" },
    { v: t.mins, l: "Minutes" },
    { v: t.secs, l: "Seconds" },
  ];
  return (
    <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-lg mx-auto">
      {items.map((it, i) => (
        <motion.div
          key={it.l}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 * i, duration: 0.6 }}
          className="text-center"
        >
          <div className="font-display text-3xl sm:text-5xl text-secondary tabular-nums">
            {String(it.v).padStart(2, "0")}
          </div>
          <div className="mt-1 text-[9px] sm:text-[10px] tracking-[0.35em] uppercase text-muted-foreground">
            {it.l}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
