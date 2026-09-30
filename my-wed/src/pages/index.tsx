import { useState } from "react";
import { Page } from "zmp-ui";

import AlbumSection from "@/components/wedding/album-section";
import EnvelopeIntro from "@/components/wedding/envelope-intro";
import FooterSection from "@/components/wedding/footer-section";
import GiftSection from "@/components/wedding/gift-section";
import HeroSection from "@/components/wedding/hero-section";
import InvitationSection from "@/components/wedding/invitation-section";
import RsvpSection from "@/components/wedding/rsvp-section";
import { RevealContext } from "@/hooks/use-reveal";
import Reveal from "@/components/wedding/reveal";
import TimelineSection from "@/components/wedding/timeline-section";

function HomePage() {
  const [opened, setOpened] = useState(false);

  return (
    <Page className="wd-page">
      <EnvelopeIntro opened={opened} onOpen={() => setOpened(true)} />
      <RevealContext.Provider value={opened}>
        <div className={`wd-sheet ${opened ? "wd-started" : ""}`}>
          <HeroSection />
          <InvitationSection />
          <TimelineSection />
          <AlbumSection />
          <Reveal>
            <RsvpSection />
          </Reveal>
          <Reveal variant="zoom">
            <GiftSection />
          </Reveal>
          <Reveal>
            <FooterSection />
          </Reveal>
        </div>
      </RevealContext.Provider>
    </Page>
  );
}

export default HomePage;
