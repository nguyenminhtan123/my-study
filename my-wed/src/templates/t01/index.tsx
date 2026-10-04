import { useState } from "react";
import { Page } from "zmp-ui";

import "@/templates/t01/styles.scss";
import { WeddingData } from "@/core/types";
import { WeddingDataProvider } from "@/core/wedding-context";

import AlbumSection from "@/templates/t01/components/album-section";
import EnvelopeIntro from "@/templates/t01/components/envelope-intro";
import FooterSection from "@/templates/t01/components/footer-section";
import GiftSection from "@/templates/t01/components/gift-section";
import HeroSection from "@/templates/t01/components/hero-section";
import InvitationSection from "@/templates/t01/components/invitation-section";
import RsvpSection from "@/templates/t01/components/rsvp-section";
import { RevealContext } from "@/core/hooks/use-reveal";
import Reveal from "@/templates/t01/components/reveal";
import TimelineSection from "@/templates/t01/components/timeline-section";

const Template01 = ({ data }: { data: WeddingData }) => {
  const [opened, setOpened] = useState(false);

  return (
    <WeddingDataProvider value={data}>
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
    </WeddingDataProvider>
  );
};

export default Template01;
