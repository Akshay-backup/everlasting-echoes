import { motion } from "framer-motion";
import { useState } from "react";
import { wedding } from "@/data/wedding";
import { GiLotus, GiBigDiamondRing, GiCrystalGrowth } from "react-icons/gi";
import { FaSun } from "react-icons/fa";

const iconMap: Record<string, React.ElementType> = {
  leaf: GiLotus,
  sun: FaSun,
  ring: GiBigDiamondRing,
  glass: GiCrystalGrowth,
};

export function Events() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="events" className="relative py-24 sm:py-32 bg-gradient-to-b from-background via-bg-accent/30 to-background overflow-hidden">
      <div className="text-center px-6 mb-16">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-script text-4xl text-secondary"
        >
          Festivities
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-2 font-display text-4xl sm:text-6xl text-primary"
        >
          Wedding Events
        </motion.h2>
        <p className="mt-4 max-w-md mx-auto text-muted-foreground text-sm">
          Four cherished days. A lifetime of memories. Tap each card for details.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-5 space-y-4">
        {wedding.events.map((e, i) => {
          const Icon = iconMap[e.icon] ?? GiLotus;
          const isOpen = open === i;
          return (
            <motion.div
              key={e.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.7 }}
              className="glass rounded-2xl overflow-hidden border border-border/40 hover:border-secondary/40 transition-colors shadow-soft"
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center gap-5 p-5 sm:p-6 text-left"
              >
                <span className="grid place-items-center h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-primary/10 text-primary text-2xl shrink-0">
                  <Icon />
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-2xl sm:text-3xl text-primary leading-tight">
                    {e.name}
                  </h3>
                  <p className="font-body text-xs tracking-widest uppercase text-muted-foreground mt-1">
                    {e.date}
                  </p>
                </div>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  className="text-2xl text-secondary font-light"
                >
                  +
                </motion.span>
              </button>

              <motion.div
                initial={false}
                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <div className="px-5 sm:px-6 pb-6 grid sm:grid-cols-3 gap-4 border-t border-border/40 pt-5">
                  <Detail label="Time" value={e.time} />
                  <Detail label="Venue" value={e.venue} />
                  <Detail label="Dress Code" value={e.dress} />
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[9px] tracking-[0.4em] uppercase text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-lg text-foreground">{value}</p>
    </div>
  );
}
