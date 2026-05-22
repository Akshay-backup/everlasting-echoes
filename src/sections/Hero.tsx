import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { wedding } from "@/data/wedding";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % wedding.heroImages.length), 6500);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="hero" ref={ref} className="relative h-[100svh] w-full overflow-hidden bg-foreground">
      {/* Layered slideshow */}
      <div className="absolute inset-0">
        {wedding.heroImages.map((src, i) => (
          <motion.img
            key={i}
            src={src}
            alt=""
            className="absolute inset-0 h-full w-full object-cover ken-burns"
            initial={false}
            animate={{ opacity: i === idx ? 1 : 0 }}
            transition={{ duration: 2.4, ease: [0.65, 0, 0.35, 1] }}
          />
        ))}
      </div>

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/70" />
      <div className="absolute inset-0 grain" />

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center text-ivory"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="font-body text-[10px] sm:text-xs tracking-[0.6em] uppercase text-ivory/80"
        >
          Together with our families
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: "blur(20px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.7, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 font-display text-[18vw] sm:text-[10vw] md:text-[8.5vw] leading-[0.9] text-balance"
        >
          {wedding.bride.name}
          <span className="font-script text-[14vw] sm:text-[7vw] md:text-[6vw] text-secondary block sm:inline mx-2 sm:mx-4 -my-4 sm:my-0 italic">
            &amp;
          </span>
          {wedding.groom.name}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="mt-8 flex items-center gap-4 text-ivory/85"
        >
          <span className="h-px w-10 sm:w-16 bg-ivory/50" />
          <span className="font-display tracking-[0.3em] text-sm sm:text-base">
            {wedding.shortDate}
          </span>
          <span className="h-px w-10 sm:w-16 bg-ivory/50" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 1 }}
          className="mt-3 font-body text-[10px] sm:text-xs tracking-[0.4em] uppercase text-ivory/70"
        >
          {wedding.city}
        </motion.p>

        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ivory/70">
          <span className="font-body text-[9px] tracking-[0.5em] uppercase">Scroll</span>
          <span className="relative h-12 w-px bg-ivory/30 overflow-hidden">
            <span
              className="absolute inset-x-0 top-0 h-3 bg-ivory"
              style={{ animation: "scroll-hint 2s ease-in-out infinite" }}
            />
          </span>
        </div>
      </motion.div>
    </section>
  );
}
