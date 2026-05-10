import { motion } from "framer-motion";
import { useState } from "react";
import { wedding } from "@/data/wedding";

export function RSVP() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="rsvp" className="relative py-24 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-bg-accent/40 to-soft-beige/60" />
      <div className="absolute inset-0 grain" />

      <div className="relative max-w-2xl mx-auto px-6 text-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-script text-4xl text-secondary"
        >
          With Love
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-2 font-display text-4xl sm:text-6xl text-primary"
        >
          Kindly RSVP
        </motion.h2>
        <p className="mt-4 text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
          Your presence is the greatest gift. Please reply by 1st November 2026.
        </p>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-10 glass rounded-2xl p-10 shadow-soft"
          >
            <p className="font-script text-4xl text-secondary">Thank you</p>
            <p className="mt-3 font-display text-xl text-primary">
              We can't wait to celebrate with you.
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="mt-10 glass rounded-2xl p-6 sm:p-10 shadow-soft text-left space-y-5"
          >
            <Field label="Full Name" name="name" required />
            <Field label="Email" name="email" type="email" required />
            <div className="grid sm:grid-cols-2 gap-5">
              <Select label="Will you attend?" name="attend" options={["Joyfully accept", "Regretfully decline"]} />
              <Select label="Number of guests" name="guests" options={["1", "2", "3", "4"]} />
            </div>
            <div>
              <label className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground">
                A note for the couple
              </label>
              <textarea
                name="message"
                rows={3}
                className="mt-2 w-full bg-transparent border-b border-border focus:border-secondary outline-none py-2 font-display text-lg text-foreground transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full mt-2 rounded-full bg-primary text-primary-foreground py-4 text-xs tracking-[0.4em] uppercase hover:bg-secondary transition-colors"
            >
              Send With Love
            </button>
          </motion.form>
        )}

        <p className="mt-12 font-script text-3xl text-secondary">{wedding.hashtag}</p>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full bg-transparent border-b border-border focus:border-secondary outline-none py-2 font-display text-lg text-foreground transition-colors"
      />
    </div>
  );
}

function Select({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <div>
      <label className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground">{label}</label>
      <select
        name={name}
        className="mt-2 w-full bg-transparent border-b border-border focus:border-secondary outline-none py-2 font-display text-lg text-foreground transition-colors"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
