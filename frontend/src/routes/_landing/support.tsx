import { createFileRoute } from '@tanstack/react-router';

import { Preview } from '~landing/preview/PreviewModeContext';
import { Developers } from '~landing/support/Developers';
import { Faq } from '~landing/support/Faq';
import { NeedHelp } from '~landing/support/NeedHelp';
import { TitleSection } from '~landing/support/TitleSection';
import { Tutorials } from '~landing/support/Tutorials';

export const Route = createFileRoute('/_landing/support')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <TitleSection />
      <Faq />
      <Tutorials />
      <Developers />
      <Preview>
        <NeedHelp />
      </Preview>
    </>
  );
}
