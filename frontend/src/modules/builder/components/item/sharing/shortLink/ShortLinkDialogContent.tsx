import { type JSX, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Stack,
  styled,
} from '@mui/material';

import { ShortLink } from '@graasp/sdk';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { NS } from '@/config/constants';
import {
  SHORT_LINK_SAVE_BUTTON_ID,
  buildShortLinkCancelBtnId,
} from '@/config/selectors';
import {
  createShortLinkMutation,
  updateShortLinkMutation,
} from '@/openapi/client/@tanstack/react-query.gen';
import { buildShortLinkKey, itemKeys } from '@/query/keys';

import CancelButton from '~builder/components/common/CancelButton';

import AliasInput from './AliasInput';
import { useAliasValidation } from './useAliasValidation';

const WrapHelper = styled(FormHelperText)(() => ({
  overflowWrap: 'anywhere',
  whiteSpace: 'normal',
  maxWidth: '240px',
}));

type Props = {
  itemId: string;
  initialAlias: string;
  platform: ShortLink['platform'];
  isNew: boolean;
  handleClose: () => void;
};

const usePutShortLink = ({
  isNew,
  itemId,
  initialAlias,
}: {
  isNew: boolean;
  initialAlias: string;
  itemId: string;
}) => {
  const { t } = useTranslation(NS.Messages);
  const queryClient = useQueryClient();

  const onSettled = () => {
    queryClient.invalidateQueries({
      queryKey: itemKeys.single(itemId).shortLinks,
    });
    queryClient.invalidateQueries({
      queryKey: buildShortLinkKey(initialAlias),
    });
  };

  const {
    mutateAsync: postShortLink,
    isPending: isPendingPostShortLink,
    isError: isErrorPostShortLink,
  } = useMutation({
    ...createShortLinkMutation(),
    onError: () => {
      toast.error?.(t('SHORT_LINK_UNEXPECTED_ERROR'));
    },
    onSettled,
  });
  const {
    mutateAsync: patchShortLink,
    isPending: isPendingPatchShortLink,
    isError: isErrorPatchShortLink,
  } = useMutation({
    ...updateShortLinkMutation(),
    onError: () => {
      toast.error?.(t('SHORT_LINK_UNEXPECTED_ERROR'));
    },
    onSettled,
  });

  const putShortLink = async ({
    alias,
    platform,
  }: {
    alias: string;
    platform: ShortLink['platform'];
  }) => {
    if (isNew) {
      await postShortLink({
        body: {
          alias,
          platform,
          itemId,
        },
      });
    } else {
      await patchShortLink({
        path: {
          alias: initialAlias, // old alias name used to find the shortLink to patch
        },
        body: {
          alias,
        },
      });
    }
  };

  return {
    putShortLink,
    isPending: isNew ? isPendingPostShortLink : isPendingPatchShortLink,
    isError: isNew ? isErrorPostShortLink : isErrorPatchShortLink,
  };
};

const ShortLinkDialogContent = ({
  itemId,
  initialAlias,
  platform,
  handleClose,
  isNew,
}: Props): JSX.Element => {
  const { t: translateBuilder } = useTranslation(NS.Builder);
  const { putShortLink, isPending } = usePutShortLink({
    isNew,
    itemId,
    initialAlias,
  });
  const [alias, setAlias] = useState<string>(initialAlias);
  const {
    isLoading: isValidationLoading,
    message,
    isError: isValidationError,
    hasAliasChanged,
  } = useAliasValidation({
    isNew,
    initialAlias,
    alias,
  });

  const DIALOG_TITLE = isNew
    ? translateBuilder('CREATE_SHORT_LINK_TITLE')
    : translateBuilder('EDIT_SHORT_LINK_TITLE');

  const handleSaveAlias = async () => {
    try {
      await putShortLink({ alias, platform });
      handleClose();
    } catch (e) {
      console.error(e);
    }
  };

  const MANAGE_SHORT_LINKS_ALERT_TITLE = `alert-title-manage-short-link-${alias}`;

  return (
    <>
      <DialogTitle id={MANAGE_SHORT_LINKS_ALERT_TITLE}>
        {DIALOG_TITLE}
      </DialogTitle>
      <DialogContent>
        <Stack direction="column" alignItems="left" spacing={2} mt={2}>
          <AliasInput
            alias={alias}
            onChange={setAlias}
            isError={hasAliasChanged && isValidationError}
          />

          <WrapHelper error={hasAliasChanged && isValidationError}>
            {message}
          </WrapHelper>
        </Stack>
      </DialogContent>
      <DialogActions>
        <CancelButton
          onClick={handleClose}
          id={buildShortLinkCancelBtnId(alias)}
          disabled={isPending}
        />
        <Button
          loading={isPending}
          color="success"
          onClick={handleSaveAlias}
          disabled={isValidationLoading || isValidationError}
          id={SHORT_LINK_SAVE_BUTTON_ID}
        >
          {translateBuilder('SAVE_BTN')}
        </Button>
      </DialogActions>
    </>
  );
};

export default ShortLinkDialogContent;
