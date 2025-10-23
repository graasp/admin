import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { TableCell, Tooltip, Typography } from '@mui/material';

import { DiscriminatedItem, ItemLoginSchemaStatus } from '@graasp/sdk';

import { NS } from '@/config/constants';
import { buildItemMembershipRowId } from '@/config/selectors';
import { ItemMembership } from '@/openapi/client';

import { BUILDER } from '~builder/langs';

import DeleteItemMembershipButton from './DeleteItemMembershipButton';
import { StyledTableRow } from './StyledTableRow';

const GuestItemMembershipTableRow = ({
  data,
  itemId,
  isDisabled,
}: {
  data: ItemMembership;
  itemId: DiscriminatedItem['id'];
  isDisabled?: boolean;
}): JSX.Element => {
  const { t: translateEnums } = useTranslation(NS.Enums);
  const { t: translateBuilder } = useTranslation(NS.Builder);

  return (
    <Tooltip
      title={
        isDisabled
          ? translateBuilder(
              BUILDER.ITEM_LOGIN_SCHEMA_DISABLED_GUEST_ACCESS_MESSAGE,
            )
          : undefined
      }
    >
      <StyledTableRow data-cy={buildItemMembershipRowId(data.id)} key={data.id}>
        <TableCell>
          <Typography
            sx={{ color: isDisabled ? 'text.disabled' : undefined }}
            noWrap
            fontWeight="bold"
          >
            {data.account.name}
          </Typography>
        </TableCell>
        <TableCell align="right">
          {isDisabled ? (
            <Typography color="text.disabled">
              {translateEnums(ItemLoginSchemaStatus.Disabled)}
            </Typography>
          ) : (
            <Typography>{translateEnums(data.permission)}</Typography>
          )}
        </TableCell>
        <TableCell align="right">
          <DeleteItemMembershipButton itemId={itemId} data={data} />
        </TableCell>
      </StyledTableRow>
    </Tooltip>
  );
};

export default GuestItemMembershipTableRow;
