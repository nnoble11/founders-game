import Hero from "@/components/Hero";
import WhatItIs from "@/components/WhatItIs";
import WhyItExists from "@/components/WhyItExists";
import GetInvolved from "@/components/GetInvolved";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <WhatItIs />
      <WhyItExists />
      <GetInvolved />
      <Footer />
    </main>
  );
}
