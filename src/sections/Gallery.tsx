import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { wedding } from "@/data/wedding";
import { HiX, HiChevronLeft, HiChevronRight } from "react-icons/hi";

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  const images = wedding.gallery;

  const close = () => setActive(null);
  const next = () => setActive((a) => (a === null ? null : (a + 1) % images.length));
  const prev = () =>
    setActive((a) => (a === null ? null : (a - 1 + images.length) % images.length));

  return (
    <section id="gallery" className="relative py-24 sm:py-32 bg-background overflow-hidden">
      <div className="text-center px-6 mb-14">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-script text-4xl text-secondary"
        >
          Memories
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-2 font-display text-4xl sm:text-6xl text-primary"
        >
          Moments Captured
        </motion.h2>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 columns-2 sm:columns-3 gap-3 sm:gap-4 [column-fill:_balance]">
        {images.map((src, i) => (
          <motion.button
            key={i}
            onClick={() => setActive(i)}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: (i % 6) * 0.05 }}
            className="block w-full mb-3 sm:mb-4 break-inside-avoid overflow-hidden rounded-sm shadow-soft group relative"
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              className="w-full h-auto object-cover transition-all duration-[1500ms] ease-out group-hover:scale-110"
              style={{ filter: "blur(0px)" }}
            />
            <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/15 transition-colors duration-500" />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-foreground/95 backdrop-blur-md grid place-items-center p-4"
            onClick={close}
          >
            <button
              onClick={close}
              className="absolute top-5 right-5 h-11 w-11 grid place-items-center rounded-full glass-dark text-ivory"
              aria-label="Close"
            >
              <HiX />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 h-12 w-12 grid place-items-center rounded-full glass-dark text-ivory"
              aria-label="Previous"
            >
              <HiChevronLeft className="text-2xl" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 h-12 w-12 grid place-items-center rounded-full glass-dark text-ivory"
              aria-label="Next"
            >
              <HiChevronRight className="text-2xl" />
            </button>
            <motion.img
              key={active}
              src={images[active]}
              alt=""
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="max-h-[88vh] max-w-[92vw] object-contain rounded-sm shadow-elegant"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
