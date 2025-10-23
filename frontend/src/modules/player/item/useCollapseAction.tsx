import { ActionTriggers } from '@graasp/sdk';

import { useMutation } from '@/config/queryClient';
import { postActionMutation } from '@/openapi/client/@tanstack/react-query.gen';

export function useCollapseAction(itemId: string) {
  const { mutate: triggerAction } = useMutation({
    ...postActionMutation(),
    onError: (e) => {
      console.error(e);
    },
  });

  const onCollapse = (c: boolean) => {
    triggerAction({
      path: { id: itemId },
      body: {
        type: c ? ActionTriggers.CollapseItem : ActionTriggers.UnCollapseItem,
      },
    });
  };
  return { triggerAction, onCollapse };
}
