import type { Metadata } from "next";
import { AboutIntro } from "@/components/sections/AboutIntro";
import { Experience } from "@/components/sections/Experience";
import { Services } from "@/components/sections/Services";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { StackMarquee } from "@/components/sections/StackMarquee";

export const metadata: Metadata = {
  title: "About",
  description:
    "Fullstack engineer specialising in low-latency web systems and production AI: LLMs, Vision Language Models, RAG and vector search.",
};

export default function AboutPage() {
  return (
    <>
      <AboutIntro />
      <Experience />
      <StackMarquee />
      <Services />
      <ContactCTA />
    </>
  );
}
