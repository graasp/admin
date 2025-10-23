import { ChangeEventHandler, type JSX, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Alert, Box, DialogContent, Grid, TextField } from '@mui/material';

import { NS } from '@/config/constants';
import { CUSTOM_APP_CYPRESS_ID } from '@/config/selectors';

import AppCard from '~builder/components/main/AppCard';

import { BUILDER } from '../../../../langs';
import addNewImage from '../../../../resources/addNew.png';
import { ItemNameField } from '../ItemNameField';
import { AppGrid } from './AppGrid';

function AppListForm({
  addCustomApp,
}: Readonly<{
  addCustomApp: () => void;
}>): JSX.Element {
  const { t: translateBuilder } = useTranslation(NS.Builder);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const {
    formState: { errors },
  } = useFormContext<{ url: string }>();

  const searchAnApp: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <DialogContent>
      <TextField
        fullWidth
        placeholder={translateBuilder(BUILDER.CREATE_APP_SEARCH_FIELD_HELPER)}
        variant="outlined"
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
        size="small"
        onChange={searchAnApp}
      />
      <Box
        display="flex"
        flexGrow={1}
        minHeight="0px"
        sx={{ overflowY: 'auto' }}
        p={1}
      >
        <Grid
          container
          spacing={2}
          height="max-content"
          maxHeight={400}
          alignItems="stretch"
        >
          <AppGrid searchQuery={searchQuery} />
          <AppCard
            testId={CUSTOM_APP_CYPRESS_ID}
            name={translateBuilder(BUILDER.CREATE_CUSTOM_APP)}
            description={translateBuilder(
              BUILDER.CREATE_CUSTOM_APP_DESCRIPTION,
            )}
            image={addNewImage}
            onClick={addCustomApp}
          />
        </Grid>
      </Box>
      <ItemNameField
        required
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus={false}
      />
      {errors.url?.type === 'required' && (
        <Alert severity="error">{translateBuilder('APP_REQUIRED_ERROR')}</Alert>
      )}
    </DialogContent>
  );
}

export default AppListForm;
