import { createFileRoute } from '@tanstack/react-router';

import { BlendedLearningSection } from '~landing/features/BlendedLearningSection';
import { BlogSection } from '~landing/features/BlogSection';
import { GraaspFeaturesSection } from '~landing/features/GraaspFeaturesSection';
import { PlatformOverviewSection } from '~landing/features/PlatformOverviewSection';
import { TitleSection } from '~landing/features/TitleSection';
import { PricingPlansSection } from '~landing/features/pricing/PricingPlansSection';
import { NewsLetter } from '~landing/home/NewsLetter';
import { Preview } from '~landing/preview/PreviewModeContext';

export const Route = createFileRoute('/_landing/features')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <TitleSection />
      <PlatformOverviewSection />
      <BlendedLearningSection />
      <GraaspFeaturesSection />
      <Preview>
        <PricingPlansSection />
      </Preview>
      <Preview>
        <BlogSection />
      </Preview>
      <Preview>
        <NewsLetter />
      </Preview>
    </>
  );
}
