import { useTranslation } from 'react-i18next';

import {
  Box,
  Divider,
  IconButton,
  SvgIcon,
  Typography,
  styled,
} from '@mui/material';

import { PenIcon, XIcon } from 'lucide-react';

import { NS } from '@/config/constants.js';
import { useButtonColor } from '@/ui/buttons/hooks.js';

import { useEditingContext } from '../context/EditingContext.js';
import {
  editBannerCloseButtonCypress,
  editBannerCypress,
  editBannerOldTextCypress,
} from '../selectors.js';
import { normalizeMentions } from '../utils.js';

const Container = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});
const EditContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'left',
  width: '100%',
  // magic to ensure that the container does not overflow its intended space
  minWidth: '0px',
});
const OldTextLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const EditIcon = styled(SvgIcon)(({ theme }) => ({
  margin: theme.spacing(1),
}));

type Props = {
  onClose: () => void;
  editedText: string;
};

export function EditBanner({ onClose, editedText }: Readonly<Props>) {
  const { open } = useEditingContext();
  const { color } = useButtonColor('error');
  const { t } = useTranslation(NS.Chatbox);
  if (!open) {
    return null;
  }
  return (
    <>
      <Divider />
      <Container data-cy={editBannerCypress}>
        <EditIcon fontSize="small" color="primary">
          <PenIcon />
        </EditIcon>
        <EditContainer>
          <OldTextLabel variant="subtitle2">
            {t('EDITING_MESSAGE_LABEL')}
          </OldTextLabel>
          <Typography noWrap data-cy={editBannerOldTextCypress}>
            {normalizeMentions(editedText)}
          </Typography>
        </EditContainer>
        <IconButton data-cy={editBannerCloseButtonCypress} onClick={onClose}>
          <XIcon color={color} />
        </IconButton>
      </Container>
    </>
  );
}
