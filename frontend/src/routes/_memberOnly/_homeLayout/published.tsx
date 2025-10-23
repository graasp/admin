import { createFileRoute } from '@tanstack/react-router';

import LibraryCard from '~builder/components/pages/home/LibraryCard';
import LibraryScreenContent from '~builder/components/pages/home/LibraryScreenContent';

export const Route = createFileRoute('/_memberOnly/_homeLayout/published')({
  component: RouteComponent,
  staticData: {
    pageTitle: 'LIBRARY',
  },
});

function RouteComponent() {
  return (
    <>
      <LibraryCard />
      <LibraryScreenContent />
    </>
  );
}
