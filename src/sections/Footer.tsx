import { wedding } from "@/data/wedding";

export function Footer() {
  return (
    <footer className="relative py-16 bg-foreground text-ivory text-center overflow-hidden">
      <div className="absolute inset-0 grain opacity-50" />
      <div className="relative">
        <div className="font-display text-5xl sm:text-6xl">
          {wedding.bride.initial}
          <span className="font-script text-secondary mx-3">&amp;</span>
          {wedding.groom.initial}
        </div>
        <p className="mt-4 font-body text-[10px] tracking-[0.5em] uppercase text-ivory/60">
          {wedding.shortDate} · {wedding.city}
        </p>
        <p className="mt-8 font-script text-2xl text-accent">Made with love</p>
      </div>
    </footer>
  );
}
