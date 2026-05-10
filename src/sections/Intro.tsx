import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { wedding } from "@/data/wedding";
import { Countdown } from "@/components/Countdown";

export function Intro() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={ref} className="relative py-28 sm:py-40 overflow-hidden bg-background">
      <motion.div
        style={{ y }}
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-script text-[28vw] text-secondary/[0.05] leading-none select-none pointer-events-none whitespace-nowrap"
      >
        Forever
      </motion.div>

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-body text-[10px] tracking-[0.5em] uppercase text-muted-foreground"
        >
          The wedding of
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="mt-6 font-display text-5xl sm:text-7xl md:text-8xl text-primary leading-[1.05] text-balance"
        >
          A love written
          <br />
          <em className="font-script text-secondary not-italic">in the stars.</em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-8 font-body text-base sm:text-lg leading-relaxed text-muted-foreground max-w-xl mx-auto"
        >
          With hearts full of joy and gratitude, we invite you to witness the
          beginning of forever — a celebration of love, family, and timeless
          tradition under the Udaipur sky.
        </motion.p>

        <div className="mt-16">
          <p className="font-body text-[10px] tracking-[0.5em] uppercase text-muted-foreground mb-6">
            Counting Down
          </p>
          <Countdown iso={wedding.date} />
        </div>
      </div>
    </section>
  );
}
