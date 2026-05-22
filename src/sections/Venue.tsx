import { motion } from "framer-motion";
import { wedding } from "@/data/wedding";
import { HiLocationMarker, HiExternalLink } from "react-icons/hi";

export function Venue() {
  return (
    <section id="venue" className="relative py-24 sm:py-32 bg-background overflow-hidden">
      <div className="text-center px-6 mb-14">
        <span className="font-script text-4xl text-secondary">The Setting</span>
        <h2 className="mt-2 font-display text-4xl sm:text-6xl text-primary">Venue</h2>
      </div>

      <div className="max-w-6xl mx-auto px-5 grid lg:grid-cols-2 gap-8 items-stretch">
        <motion.div
          initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="relative aspect-[4/3] lg:aspect-auto overflow-hidden rounded-sm shadow-elegant"
        >
          <motion.img
            src={wedding.venue.image}
            alt={wedding.venue.name}
            loading="lazy"
            className="h-full w-full object-cover"
            initial={{ scale: 1.05 }}
            whileInView={{ scale: 1.12 }}
            viewport={{ once: true }}
            transition={{ duration: 12, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: "transform" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-ivory">
            <p className="font-script text-2xl text-accent">A royal welcome</p>
            <h3 className="font-display text-3xl sm:text-4xl mt-1">{wedding.venue.name}</h3>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-col gap-5"
        >
          <div className="glass rounded-2xl p-6 sm:p-8 shadow-soft">
            <span className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground">
              Address
            </span>
            <p className="mt-2 font-display text-xl sm:text-2xl text-foreground leading-snug">
              {wedding.venue.address}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={wedding.venue.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-3 text-xs tracking-[0.25em] uppercase hover:bg-secondary transition-colors"
              >
                <HiLocationMarker /> Get Directions
              </a>
              <a
                href={wedding.venue.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-xs tracking-[0.25em] uppercase text-foreground hover:border-secondary hover:text-secondary transition-colors"
              >
                <HiExternalLink /> Open in Maps
              </a>
            </div>
          </div>
          <div className="flex-1 rounded-2xl overflow-hidden shadow-soft min-h-[260px]">
            <iframe
              title="Venue map"
              src={wedding.venue.embedUrl}
              loading="lazy"
              className="w-full h-full min-h-[260px] border-0 grayscale-[0.3]"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
