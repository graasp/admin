import { type JSX, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Fab from '@mui/material/Fab';

import { SearchIcon } from 'lucide-react';

import { NS } from '@/config/constants';

import GeolocationPicker, {
  GeolocationPickerProps,
} from '../GeolocationPicker/GeolocationPicker';
import { useQueryClientContext } from '../context/QueryClientContext';
import Search from './Search';

type Props = {
  onChange: (tags: string[]) => void;
  tags: string[];
  onChangeOption: GeolocationPickerProps['onChangeOption'];
};

const MobileTopBar = ({
  onChange,
  tags,
  onChangeOption,
}: Props): JSX.Element => {
  const { currentMember, useSuggestionsForAddress } = useQueryClientContext();
  const { t } = useTranslation(NS.Map);
  const { t: commonT } = useTranslation(NS.Common);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Fab
        color="primary"
        aria-label={t('filters')}
        onClick={handleClickOpen}
        role="search"
        sx={{ position: 'absolute', bottom: 20, right: 20 }}
      >
        <SearchIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{t('Filters')}</DialogTitle>
        <DialogContent>
          {currentMember && (
            <>
              <br />
              <GeolocationPicker
                onChangeOption={(v) => {
                  onChangeOption?.(v);
                  setOpen(false);
                }}
                useSuggestionsForAddress={useSuggestionsForAddress}
              />
              <br />
            </>
          )}
          <Search tags={tags} onChange={onChange} />
          <br />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{commonT('CLOSE.BUTTON_TEXT')}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default MobileTopBar;
