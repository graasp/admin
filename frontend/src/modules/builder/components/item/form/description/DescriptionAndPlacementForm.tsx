import type { JSX } from 'react';

import { Stack } from '@mui/material';

import { DescriptionForm } from './DescriptionForm';
import DescriptionPlacementForm from './DescriptionPlacementForm';

type DescriptionAndPlacementFormProps = {
  id?: string;
};

export function DescriptionAndPlacementForm({
  id,
}: Readonly<DescriptionAndPlacementFormProps>): JSX.Element {
  return (
    <Stack spacing={2}>
      <DescriptionForm id={id} />
      <DescriptionPlacementForm />
    </Stack>
  );
}
