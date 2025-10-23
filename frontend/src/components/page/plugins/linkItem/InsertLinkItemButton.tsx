import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import { NS } from '@/config/constants';
import { PAGE_TOOLBAR_INSERT_LINK_BUTTON_ID } from '@/config/selectors';

import useModalStatus from '~builder/components/hooks/useModalStatus';
import LinkUrlField from '~builder/components/item/form/link/LinkUrlField';

import { INSERT_LINK_ITEM_COMMAND } from './LinkItemPlugin';

type Inputs = {
  url: string;
};

export function InsertLinkItemButton() {
  const { t } = useTranslation(NS.PageEditor);
  const { t: translateCommon } = useTranslation(NS.Common);

  const [editor] = useLexicalComposerContext();
  const { isOpen, closeModal, openModal } = useModalStatus();

  const methods = useForm<Inputs>({});
  const {
    handleSubmit,
    formState: { isValid, isSubmitted },
  } = methods;

  const onSubmit = (data: Inputs) => {
    editor.dispatchCommand(INSERT_LINK_ITEM_COMMAND, {
      url: data.url,
    });

    closeModal();
  };

  return (
    <>
      <Button
        size="small"
        variant="outlined"
        onClick={openModal}
        aria-label={t('TOOLBAR.LINK_ITEM.BUTTON')}
        id={PAGE_TOOLBAR_INSERT_LINK_BUTTON_ID}
      >
        {t('TOOLBAR.LINK_ITEM.BUTTON')}
      </Button>
      <Dialog onClose={closeModal} open={isOpen}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <FormProvider {...methods}>
            <DialogTitle>{t('TOOLBAR.LINK_ITEM.INSERT.TITLE')}</DialogTitle>
            <DialogContent>
              <LinkUrlField />
            </DialogContent>
            <DialogActions>
              <Button onClick={closeModal}>
                {translateCommon('CANCEL.BUTTON_TEXT')}
              </Button>
              <Button
                variant="contained"
                type="submit"
                disabled={isSubmitted && !isValid}
              >
                {t('TOOLBAR.LINK_ITEM.INSERT.SUBMIT_BUTTON')}
              </Button>
            </DialogActions>
          </FormProvider>
        </Box>
      </Dialog>
    </>
  );
}
