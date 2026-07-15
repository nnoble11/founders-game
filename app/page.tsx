import Hero from "@/components/Hero";
import WhatItIs from "@/components/WhatItIs";
import GameOne from "@/components/GameOne";
import TheSeason from "@/components/TheSeason";
import Sponsors from "@/components/Sponsors";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <WhatItIs />
      <GameOne />
      <TheSeason />
      <Sponsors />
      <Footer />
    </main>
  );
}
