import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Typography } from '@mui/material';

import { NS } from '@/config/constants';

import { useFilterItemsContext } from '~builder/components/context/FilterItemsContext';

const NoItemFilters = ({ searchText }: { searchText: string }): JSX.Element => {
  const { t: translateBuilder } = useTranslation(NS.Builder);
  const { itemTypes } = useFilterItemsContext();

  return (
    <Box mt={1}>
      <Typography variant="body1" textAlign="center">
        {translateBuilder('ITEM_SEARCH_NOTHING_FOUND')}
      </Typography>
      {searchText && (
        <Typography variant="body1" textAlign="center">
          <strong>
            {translateBuilder('ITEM_SEARCH_NOTHING_FOUND_QUERY_TITLE')}
          </strong>
          : {searchText}
        </Typography>
      )}
      {itemTypes.length ? (
        <Typography variant="body1" textAlign="center">
          <strong>
            {translateBuilder('ITEM_SEARCH_NOTHING_FOUND_TYPES_TITLE')}:{' '}
          </strong>
          {itemTypes.join(', ')}
        </Typography>
      ) : null}
    </Box>
  );
};

export default NoItemFilters;
