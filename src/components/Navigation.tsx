import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { HiMenuAlt4, HiX } from "react-icons/hi";

const links = [
  { id: "hero", label: "Home" },
  { id: "story", label: "Our Story" },
  { id: "events", label: "Events" },
  { id: "gallery", label: "Gallery" },
  { id: "venue", label: "Venue" },
  { id: "rsvp", label: "RSVP" },
];

export function Navigation() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 80);
    if (latest > prev && latest > 200) setHidden(true);
    else setHidden(false);
  });

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: hidden ? -120 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed top-0 inset-x-0 z-50"
      >
        <div
          className={`mx-auto mt-4 max-w-6xl px-5 sm:px-8 transition-all duration-500 ${
            scrolled ? "py-2" : "py-4"
          }`}
        >
          <div className={`glass rounded-full flex items-center justify-between px-5 sm:px-7 py-3 ${scrolled ? "shadow-soft" : ""}`}>
            <button onClick={() => go("hero")} className="font-script text-2xl sm:text-3xl text-secondary leading-none">
              A &amp; V
            </button>
            <nav className="hidden md:flex items-center gap-8">
              {links.slice(1).map((l) => (
                <button
                  key={l.id}
                  onClick={() => go(l.id)}
                  className="font-body text-[11px] tracking-[0.3em] uppercase text-foreground/80 hover:text-secondary transition-colors"
                >
                  {l.label}
                </button>
              ))}
            </nav>
            <button
              onClick={() => setOpen(true)}
              className="md:hidden h-9 w-9 grid place-items-center rounded-full text-foreground"
              aria-label="Open menu"
            >
              <HiMenuAlt4 className="text-xl" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile bottom sheet */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-foreground/40 backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 280 }}
              className="fixed bottom-0 inset-x-0 z-[70] glass rounded-t-3xl p-8 pt-6 md:hidden"
            >
              <div className="mx-auto h-1 w-12 rounded-full bg-foreground/20 mb-6" />
              <div className="flex items-center justify-between mb-6">
                <span className="font-script text-3xl text-secondary">A &amp; V</span>
                <button onClick={() => setOpen(false)} className="h-9 w-9 grid place-items-center rounded-full bg-foreground/5">
                  <HiX />
                </button>
              </div>
              <ul className="space-y-1">
                {links.map((l, i) => (
                  <motion.li
                    key={l.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <button
                      onClick={() => go(l.id)}
                      className="w-full text-left font-display text-3xl py-3 border-b border-border/60 text-foreground hover:text-secondary transition-colors"
                    >
                      {l.label}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
