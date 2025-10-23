import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from '@mui/material';

import { SquareArrowOutUpRightIcon } from 'lucide-react';

import { NS } from '@/config/constants';

import LinkUrlField from '~builder/components/item/form/link/LinkUrlField';

interface LinkItemMenuUrlProps {
  url: string;
  onUrlChange: (url: string) => void;
}

type Inputs = {
  url: string;
};

export function useLinkItemMenuUrl({ url, onUrlChange }: LinkItemMenuUrlProps) {
  const { t } = useTranslation(NS.PageEditor);
  const { t: translateCommon } = useTranslation(NS.Common);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const methods = useForm<Inputs>({
    defaultValues: { url },
  });
  const {
    handleSubmit,
    formState: { isValid, isSubmitted },
  } = methods;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onSubmit = (event: Inputs) => {
    onUrlChange(event.url);

    handleClose();
  };

  return {
    button: (
      <Button
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        aria-label={t('LINK.URL.BUTTON')}
      >
        {t('LINK.URL.BUTTON')}
      </Button>
    ),
    modal: (
      <Dialog onClose={handleClose} open={open}>
        <FormProvider {...methods}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <DialogContent>
              <LinkUrlField />
              <Button
                component="a"
                href={url}
                target="_blank"
                rel="noreferrer"
                endIcon={<SquareArrowOutUpRightIcon size={16} />}
                data-umami-event="visit-link-editor-page"
              >
                {t('LINK.URL.VISIT_LINK_BUTTON')}
              </Button>
            </DialogContent>

            <DialogActions>
              <Button size="small" onClick={handleClose}>
                {translateCommon('CANCEL.BUTTON_TEXT')}
              </Button>
              <Button
                size="small"
                variant="contained"
                type="submit"
                disabled={isSubmitted && !isValid}
              >
                {translateCommon('EDIT.BUTTON_TEXT')}
              </Button>
            </DialogActions>
          </Box>
        </FormProvider>
      </Dialog>
    ),
  };
}
