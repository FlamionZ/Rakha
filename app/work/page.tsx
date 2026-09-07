import type { Metadata } from "next";
import { ProjectIndex } from "@/components/project/ProjectIndex";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ui } from "@/content/ui";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Eleven shipped software products: AI-native POS systems, RAG engines, an enterprise insurance CRM, a regional MSME search platform and a high-concurrency live-chat platform.",
};

export default function WorkPage() {
  return (
    <>
      <div className="px-5 pb-16 pt-32 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            label={ui.sections.allWorkLabel}
            title={ui.sections.allWorkTitle}
            body={ui.sections.allWorkBody}
          />
          <ProjectIndex />
        </div>
      </div>
      <ContactCTA />
    </>
  );
}
