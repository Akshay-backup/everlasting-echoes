import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { wedding } from "@/data/wedding";

function StoryCard({
  item,
  index,
}: {
  item: (typeof wedding.story)[number];
  index: number;
}) {
  const reverse = index % 2 === 1;
  return (
    <div className="relative grid md:grid-cols-2 gap-8 sm:gap-14 items-center py-16 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 60, filter: "blur(15px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className={`relative aspect-[4/5] overflow-hidden rounded-sm shadow-elegant group ${reverse ? "md:order-2" : ""}`}
      >
        <motion.img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="h-full w-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <span className="absolute top-5 left-5 font-script text-3xl text-ivory">
          {item.year}
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, delay: 0.2 }}
        className={reverse ? "md:order-1 md:text-right" : ""}
      >
        <span className="font-body text-[10px] tracking-[0.5em] uppercase text-secondary">
          Chapter 0{index + 1}
        </span>
        <h3 className="mt-3 font-display text-4xl sm:text-5xl md:text-6xl text-primary">
          {item.title}
        </h3>
        <div className={`mt-4 h-px w-16 bg-secondary/50 ${reverse ? "md:ml-auto" : ""}`} />
        <p className="mt-6 font-body text-base leading-relaxed text-muted-foreground max-w-md">
          {item.text}
        </p>
      </motion.div>
    </div>
  );
}

export function OurStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="story" ref={ref} className="relative py-24 sm:py-32 bg-background overflow-hidden">
      <div className="text-center mb-16 px-6">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-script text-4xl text-secondary"
        >
          Our Journey
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-2 font-display text-4xl sm:text-6xl text-primary"
        >
          The Story of Us
        </motion.h2>
      </div>

      <div className="relative max-w-5xl mx-auto px-6">
        {/* timeline line */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2">
          <motion.div
            style={{ height: lineHeight }}
            className="absolute top-0 inset-x-0 bg-gradient-to-b from-secondary via-primary to-accent origin-top"
          />
        </div>

        {wedding.story.map((s, i) => (
          <StoryCard key={s.year} item={s} index={i} />
        ))}
      </div>
    </section>
  );
}
