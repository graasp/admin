import { createFileRoute } from '@tanstack/react-router';

import Association from '~landing/aboutUs/Association';
import { ContactSection } from '~landing/aboutUs/ContactSection';
import PresentationVideoSection from '~landing/aboutUs/PresentationVideoSection';
import TeamMembers from '~landing/aboutUs/TeamMembers';
import { TitleSection } from '~landing/aboutUs/TitleSection';
import { Preview } from '~landing/preview/PreviewModeContext';

export const Route = createFileRoute('/_landing/about-us')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <TitleSection />
      <Association />
      <TeamMembers />
      <ContactSection />

      <Preview>
        <PresentationVideoSection />
      </Preview>
    </>
  );
}
