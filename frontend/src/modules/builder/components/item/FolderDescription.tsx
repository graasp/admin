import type { JSX } from 'react';

import { hooks } from '@/config/queryClient';
import TextDisplay from '@/ui/TextDisplay/TextDisplay';

type Props = {
  itemId?: string;
};

const FolderDescription = ({ itemId }: Props): JSX.Element | null => {
  const { data: parentItem } = hooks.useItem(itemId);

  if (!itemId) {
    return null;
  }

  return <TextDisplay content={parentItem?.description ?? ''} />;
};

export default FolderDescription;
