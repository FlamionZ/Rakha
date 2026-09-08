import { Services } from "@/components/sections/Services";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Hero } from "@/components/sections/Hero";
import { StackMarquee } from "@/components/sections/StackMarquee";
import { StatsBar } from "@/components/sections/StatsBar";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <StackMarquee />
      <FeaturedWork />
      <Services />
      <ContactCTA />
    </>
  );
}
