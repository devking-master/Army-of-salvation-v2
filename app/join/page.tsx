import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";
import JoinPageTabs from "@/components/JoinPageTabs";

export const metadata: Metadata = {
  title: "Join Us & Member Profiles",
  description: "Register for the Army of Salvation or lookup existing member profiles using your unique Service Number.",
};

export default function Join() {
  return (
    <section className="section-pad min-h-screen bg-panel/40 pt-28 sm:pt-32">
      <div className="container-pad">
        <SectionHeader
          title="Salvation Command Hub"
          subtitle="Submit recruitment details to get your unique Service Number & QR Code, or search existing profiles."
        />
        <JoinPageTabs />
      </div>
    </section>
  );
}
