import { type JSX, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { Link, Stack, styled } from '@mui/material';

import { ShortLink } from '@graasp/sdk';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { NS } from '@/config/constants';
import {
  SHORT_LINK_COMPONENT,
  buildShortLinkPlatformTextId,
  buildShortLinkUrlTextId,
} from '@/config/selectors';
import {
  deleteAliasMutation,
  getShortLinksForItemOptions,
} from '@/openapi/client/@tanstack/react-query.gen';
import { AccentColors } from '@/ui/theme';

import {
  SHORT_LINK_COLOR,
  SHORT_LINK_CONTAINER_BORDER_STYLE,
  SHORT_LINK_CONTAINER_BORDER_WIDTH,
} from '~builder/constants';

import ConfirmDeleteLink from './ConfirmDeleteLink';
import PlatformIcon from './PlatformIcon';
import ShortLinkMenu from './ShortLinkMenu';

type Props = {
  url: string;
  shortLink: ShortLink;
  isShorten: boolean;
  canAdminShortLink: boolean;
  onUpdate: () => void;
  onCreate: (platform: ShortLink['platform']) => void;
};

const StyledBox = styled(Stack)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  borderWidth: SHORT_LINK_CONTAINER_BORDER_WIDTH,
  borderStyle: SHORT_LINK_CONTAINER_BORDER_STYLE,
  padding: theme.spacing(1),
  margin: theme.spacing(1, 'auto'),
  maxWidth: '100%',
}));

const StyledLink = styled(Link)(() => ({
  color: SHORT_LINK_COLOR,
  textDecoration: 'none !important',
  textOverflow: 'ellipsis',
  overflowWrap: 'anywhere',
}));

const StyledText = styled('p')(({ color = 'auto' }) => ({
  color,
  textTransform: 'capitalize',
}));

const ShortLinkDisplay = ({
  url,
  shortLink,
  isShorten,
  canAdminShortLink,
  onUpdate,
  onCreate,
}: Props): JSX.Element => {
  const { alias, platform } = shortLink;
  const queryClient = useQueryClient();
  const { t } = useTranslation(NS.Messages);
  const { mutate: deleteShortLink } = useMutation({
    ...deleteAliasMutation({ path: { alias } }),
    onSuccess: (data) => {
      toast(t('DELETE_SHORT_LINK'), { type: 'success' });
      queryClient.invalidateQueries(
        getShortLinksForItemOptions({ path: { itemId: data.itemId } }),
      );
    },
    onError: (error: Error) => {
      toast(error.message, { type: 'error' });
    },
  });
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleDeleteAlias = () => {
    if (canAdminShortLink) {
      deleteShortLink({ path: { alias } });
    } else {
      console.error('Only administrators can delete short link.');
    }
  };

  const responsiveDirection = {
    xs: 'column',
    sm: 'row',
  } as const;

  const textAlign = { xs: 'center', sm: 'start' } as const;

  return (
    <>
      {canAdminShortLink && (
        <ConfirmDeleteLink
          open={modalOpen}
          setOpen={setModalOpen}
          handleDelete={handleDeleteAlias}
          shortLink={alias}
        />
      )}
      <StyledBox
        justifyContent="space-between"
        alignItems="center"
        direction={responsiveDirection}
        className={SHORT_LINK_COMPONENT}
      >
        <Stack
          direction={responsiveDirection}
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <StyledBox minWidth="120px" direction="row" spacing={1} color="white">
            <PlatformIcon
              platform={platform}
              accentColor={AccentColors[platform]}
            />
            <StyledText
              id={buildShortLinkPlatformTextId(platform)}
              color={AccentColors[platform]}
            >
              {platform}
            </StyledText>
          </StyledBox>
          <StyledLink
            id={buildShortLinkUrlTextId(platform)}
            textAlign={textAlign}
            href={url}
            target="_blank"
          >
            {url}
          </StyledLink>
        </Stack>

        <ShortLinkMenu
          shortLink={shortLink}
          url={url}
          isShorten={isShorten}
          canAdminShortLink={canAdminShortLink}
          onCreate={onCreate}
          onUpdate={onUpdate}
          onDelete={() => setModalOpen(true)}
        />
      </StyledBox>
    </>
  );
};

export default ShortLinkDisplay;
