import { type JSX, useState } from 'react';
import { useTranslation } from 'react-i18next';

import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Typography,
  styled,
} from '@mui/material';

import { ActionTriggers } from '@graasp/sdk';

import { NS } from '@/config/constants';

import { getColorForActionTriggerType } from '~analytics/constants';

const actionsDescriptionTransKeys = Object.values(ActionTriggers).reduce(
  (acc: { [key: string]: string }, cur) => {
    acc[cur] = `${cur.toUpperCase().replaceAll('-', '_')}_ACTION_DESCRIPTION`;
    return acc;
  },
  {},
);

const StyledFab = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(4),
}));

const ActionColorBox = styled(Box)<{ background: string }>(
  ({ theme, background }) => ({
    width: theme.spacing(2),
    height: theme.spacing(2),
    minWidth: theme.spacing(2),
    borderRadius: theme.spacing(0.5),
    background,
  }),
);

type Props = {
  actionsTypes: string[];
};

const ActionsLegend = ({ actionsTypes }: Props): JSX.Element => {
  const { t } = useTranslation(NS.Analytics);
  const { t: translateAction } = useTranslation(NS.Common);

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title={t('ACTIONS_LEGEND_MODAL_TITLE')} placement="left">
        <StyledFab
          color="primary"
          aria-label={t('ACTIONS_LEGEND_MODAL_TITLE')}
          onClick={() => setOpen(true)}
          size="large"
          sx={{ zIndex: 50 }}
        >
          <QuestionMarkIcon />
        </StyledFab>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ paddingBottom: 0 }}>
          {t('ACTIONS_LEGEND_MODAL_TITLE')}
        </DialogTitle>
        <DialogContent>
          <List sx={{ columns: actionsTypes.length > 5 ? 2 : 1 }}>
            {actionsTypes.map((ele) => (
              <ListItem
                key={ele}
                sx={{ p: 0, marginBottom: 1, breakInside: 'avoid' }}
              >
                <ListItemText
                  primary={
                    <Box display="flex" gap={1} alignItems="center">
                      <ActionColorBox
                        background={getColorForActionTriggerType(ele)}
                      />
                      <Typography variant="body2" lineHeight={2}>
                        {
                          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          // @ts-expect-error
                          translateAction(ele)
                        }
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Typography
                      color="gray"
                      variant="caption"
                      lineHeight={1.5}
                      display="block"
                    >
                      {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        t(actionsDescriptionTransKeys[ele])
                      }
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ActionsLegend;
