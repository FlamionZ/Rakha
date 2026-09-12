import { SectionRail } from "@/components/layout/SectionRail";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { Hero } from "@/components/sections/Hero";
import { PinnedWork } from "@/components/sections/PinnedWork";
import { Services } from "@/components/sections/Services";
import { StackMarquee } from "@/components/sections/StackMarquee";
import { StatsBar } from "@/components/sections/StatsBar";

export default function HomePage() {
  return (
    <>
      {/* Rail lives here rather than in the layout: its sections are
          specific to this page. */}
      <SectionRail />
      <Hero />
      <StatsBar />
      <StackMarquee />
      <PinnedWork />
      <Services />
      <ContactCTA />
    </>
  );
}
