import { type JSX, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  DialogActions,
  DialogContent,
  DialogContentText,
  Stack,
  TextField,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

import { DiscriminatedItem } from '@graasp/sdk';

import { NS } from '@/config/constants';
import notifier from '@/config/notifier';
import { mutations } from '@/config/queryClient';
import { useItemGeolocation } from '@/query/hooks/itemGeolocation';
import Button from '@/ui/buttons/Button/Button';

import { BUILDER } from '~builder/langs';

type Props = {
  item: DiscriminatedItem;
};

export const GeolocationModalButton = ({ item }: Props): JSX.Element => {
  const { t } = useTranslation(NS.Builder);
  const { t: commonT } = useTranslation(NS.Common);
  const [open, setOpen] = useState(false);
  const { data: geoloc } = useItemGeolocation(item.id);
  const { mutate: saveGeoloc } = mutations.usePutItemGeolocation();

  const helperLabelRef = useRef<HTMLInputElement>(null);
  const addressLabelRef = useRef<HTMLInputElement>(null);
  const latRef = useRef<HTMLInputElement>(null);
  const lngRef = useRef<HTMLInputElement>(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSave = () => {
    const lat = latRef.current?.value ?? geoloc?.lat;
    const lng = lngRef.current?.value ?? geoloc?.lng;

    if (!lat || !lng) {
      notifier({
        type: 'PUT_GEOLOCATION_ERROR',
        payload: {
          error: new Error(t(BUILDER.ITEM_GEOLOCATION_ADVANCED_MODAL_ERROR)),
        },
      });
      return;
    }

    saveGeoloc({
      itemId: item.id,
      geolocation: {
        helperLabel: helperLabelRef.current?.value ?? geoloc?.helperLabel,
        addressLabel: addressLabelRef.current?.value ?? geoloc?.addressLabel,
        // country is sent, but actually not used in the backend
        // it is because the backend compute automatically the country given lat and lng to prevent mismatch
        // country: country ?? geoloc?.country,
        lat: +lat,
        lng: +lng,
      },
    });
    setOpen(false);
  };

  return (
    <>
      <Button variant="text" onClick={handleClickOpen}>
        {t(BUILDER.ITEM_GEOLOCATION_ADVANCED_BUTTON)}
      </Button>
      <Dialog onClose={handleClose} open={open} scroll="body">
        <DialogTitle>
          {t(BUILDER.ITEM_GEOLOCATION_ADVANCED_MODAL_TITLE)}
        </DialogTitle>

        <DialogContent>
          <Stack gap={2}>
            <Stack>
              <DialogContentText>
                {t(BUILDER.ITEM_GEOLOCATION_ADVANCED_MODAL_DESCRIPTION)}
              </DialogContentText>
            </Stack>
            <Stack direction="row" gap={2}>
              <Stack flexGrow={1}>
                <TextField
                  inputRef={latRef}
                  defaultValue={geoloc?.lat}
                  label={t(
                    BUILDER.ITEM_GEOLOCATION_ADVANCED_MODAL_LATITUDE_LABEL,
                  )}
                  type="number"
                  required
                />
              </Stack>
              <Stack flexGrow={1}>
                <TextField
                  inputRef={lngRef}
                  defaultValue={geoloc?.lng}
                  label={t(
                    BUILDER.ITEM_GEOLOCATION_ADVANCED_MODAL_LONGITUDE_LABEL,
                  )}
                  type="number"
                  required
                />
              </Stack>
            </Stack>
            <Stack>
              <TextField
                inputRef={addressLabelRef}
                label={t(BUILDER.ITEM_GEOLOCATION_ADVANCED_MODAL_ADDRESS_LABEL)}
                multiline
                type="text"
                defaultValue={geoloc?.addressLabel ?? undefined}
              />
            </Stack>
            <Stack>
              <TextField
                inputRef={helperLabelRef}
                defaultValue={geoloc?.helperLabel ?? undefined}
                multiline
                label={t(
                  BUILDER.ITEM_GEOLOCATION_ADVANCED_MODAL_SECONDARY_ADDRESS_LABEL,
                )}
                placeholder={t(
                  BUILDER.ITEM_GEOLOCATION_ADVANCED_MODAL_SECONDARY_ADDRESS_PLACEHOLDER,
                )}
                type="text"
              />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="text">
            {commonT('CANCEL.BUTTON_TEXT')}
          </Button>
          <Button onClick={onSave}>{commonT('SAVE.BUTTON_TEXT')}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GeolocationModalButton;
