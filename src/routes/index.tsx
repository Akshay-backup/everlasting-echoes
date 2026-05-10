import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Preloader } from "@/components/Preloader";
import { InviteOpening } from "@/components/InviteOpening";
import { Navigation } from "@/components/Navigation";
import { Petals } from "@/components/Petals";
import { MusicPlayer } from "@/components/MusicPlayer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollProgress, WhatsAppButton } from "@/components/Floating";
import { Hero } from "@/sections/Hero";
import { Intro } from "@/sections/Intro";
import { OurStory } from "@/sections/OurStory";
import { Events } from "@/sections/Events";
import { Gallery } from "@/sections/Gallery";
import { Venue } from "@/sections/Venue";
import { RSVP } from "@/sections/RSVP";
import { Footer } from "@/sections/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aanya & Vihaan — A Cinematic Wedding Invitation" },
      {
        name: "description",
        content:
          "Together with our families, we invite you to celebrate the wedding of Aanya & Vihaan — Udaipur, 12.12.2026.",
      },
      { property: "og:title", content: "Aanya & Vihaan — Wedding Invitation" },
      {
        property: "og:description",
        content: "A cinematic celebration of love. Udaipur · 12.12.2026.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  const [ready, setReady] = useState(false);
  const [opened, setOpened] = useState(false);

  return (
    <div className="relative min-h-screen bg-background">
      <Preloader onDone={() => setReady(true)} />
      {ready && !opened && <InviteOpening onDone={() => setOpened(true)} />}
      {ready && (
        <>
          <SmoothScroll />
          <ScrollProgress />
          <Navigation />
          <Petals count={12} />
          <main>
            <Hero />
            <Intro />
            <OurStory />
            <Events />
            <Gallery />
            <Venue />
            <RSVP />
          </main>
          <Footer />
          <MusicPlayer autoStart />
          <WhatsAppButton />
        </>
      )}
    </div>
  );
}
