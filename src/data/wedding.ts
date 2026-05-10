import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";
import venueImg from "@/assets/venue.jpg";

export const wedding = {
  bride: { name: "Aanya", initial: "A" },
  groom: { name: "Vihaan", initial: "V" },
  // ISO date — used by countdown
  date: "2026-12-12T17:00:00+05:30",
  dateDisplay: "Twelfth of December, Two Thousand Twenty Six",
  shortDate: "12 . 12 . 2026",
  hashtag: "#AanyaWedsVihaan",
  city: "Udaipur, India",
  audioUrl:
    "https://cdn.pixabay.com/download/audio/2022/03/15/audio_5cfac98fd0.mp3?filename=indian-music-178594.mp3",
  heroImages: [hero1, hero2, hero3],
  story: [
    {
      year: "2019",
      title: "First Glance",
      text: "An ordinary evening in Bandra became extraordinary when our eyes met across a crowded café.",
      image: g6,
    },
    {
      year: "2021",
      title: "The Proposal",
      text: "Beneath a sky of Jaipur stars, on bended knee, a question that changed everything.",
      image: g3,
    },
    {
      year: "2024",
      title: "Engagement",
      text: "Family, laughter, golden rings — a promise sealed under a canopy of marigold.",
      image: g1,
    },
    {
      year: "2026",
      title: "The Wedding",
      text: "And so begins the chapter we have been writing in our hearts all along.",
      image: hero2,
    },
  ],
  events: [
    {
      name: "Mehendi",
      date: "10 December 2026",
      time: "4:00 PM onwards",
      venue: "Gulab Bagh, Udaipur",
      dress: "Pastel florals",
      icon: "leaf",
    },
    {
      name: "Haldi",
      date: "11 December 2026",
      time: "11:00 AM",
      venue: "Lake Pavilion",
      dress: "Sunshine yellow",
      icon: "sun",
    },
    {
      name: "Wedding",
      date: "12 December 2026",
      time: "7:00 PM",
      venue: "Taj Lake Palace",
      dress: "Traditional formal",
      icon: "ring",
    },
    {
      name: "Reception",
      date: "13 December 2026",
      time: "8:00 PM",
      venue: "Jagmandir Island",
      dress: "Black tie / Indian formal",
      icon: "glass",
    },
  ],
  gallery: [g1, g2, g3, g4, g5, g6, hero1, hero3],
  venue: {
    name: "Taj Lake Palace",
    address: "Pichola, Udaipur, Rajasthan 313001",
    image: venueImg,
    mapsUrl: "https://maps.google.com/?q=Taj+Lake+Palace+Udaipur",
    embedUrl:
      "https://www.google.com/maps?q=Taj+Lake+Palace+Udaipur&output=embed",
  },
};

export type WeddingData = typeof wedding;
