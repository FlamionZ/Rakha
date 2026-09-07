import type { Metadata } from "next";
import { AboutIntro } from "@/components/sections/AboutIntro";
import { Capabilities } from "@/components/sections/Capabilities";
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
      <StackMarquee />
      <Capabilities />
      <ContactCTA />
    </>
  );
}
