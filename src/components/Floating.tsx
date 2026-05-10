import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-secondary origin-left z-[55]"
    />
  );
}

export function WhatsAppButton() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <motion.a
      href="https://wa.me/919999999999?text=Hi! I'd love to RSVP for the wedding."
      target="_blank"
      rel="noreferrer"
      initial={false}
      animate={{ opacity: show ? 1 : 0, scale: show ? 1 : 0.6, pointerEvents: show ? "auto" : "none" }}
      className="fixed bottom-6 left-6 z-50 h-12 w-12 rounded-full bg-[oklch(0.65_0.16_150)] text-white grid place-items-center shadow-soft"
      aria-label="WhatsApp"
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
        <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .2 5.3.2 11.85a11.78 11.78 0 0 0 1.65 6L0 24l6.31-1.65a11.86 11.86 0 0 0 5.74 1.46h.01c6.55 0 11.86-5.3 11.86-11.85 0-3.17-1.23-6.15-3.4-8.48zM12.06 21.8h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.9 9.9 0 0 1-1.51-5.32c0-5.46 4.45-9.91 9.92-9.91 2.65 0 5.14 1.03 7.01 2.91a9.83 9.83 0 0 1 2.9 7.01c0 5.47-4.45 9.92-9.92 9.92zm5.43-7.42c-.3-.15-1.76-.87-2.04-.97-.27-.1-.47-.15-.67.15s-.77.97-.95 1.17c-.17.2-.35.22-.65.07a8.13 8.13 0 0 1-2.4-1.48 8.97 8.97 0 0 1-1.65-2.06c-.17-.3-.02-.45.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.21 5.1 4.5.71.31 1.27.5 1.7.64.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.34z" />
      </svg>
    </motion.a>
  );
}
