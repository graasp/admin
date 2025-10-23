import { useParams } from '@tanstack/react-router';

import { hooks } from '@/config/queryClient';

const usePageTitle = (): string | undefined => {
  const { rootId, itemId } = useParams({ from: '/player/$rootId/$itemId/' });
  const { data: root } = hooks.useItem(rootId);
  const { data: item } = hooks.useItem(itemId);
  if (root && item) {
    if (rootId !== itemId) {
      return `${item.name} | ${root.name}`;
    }
    return item.name;
  }
  return undefined;
};

export default usePageTitle;
