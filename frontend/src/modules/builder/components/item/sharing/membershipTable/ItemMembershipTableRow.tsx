import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { TableCell, Typography } from '@mui/material';

import {
  AccountType,
  DiscriminatedItem,
  ItemLoginSchemaStatus,
} from '@graasp/sdk';

import { NS } from '@/config/constants';
import {
  buildItemMembershipRowEditButtonId,
  buildItemMembershipRowId,
} from '@/config/selectors';
import { ItemMembership } from '@/openapi/client';
import { DEFAULT_TEXT_DISABLED_COLOR } from '@/ui/theme';

import DeleteItemMembershipButton from './DeleteItemMembershipButton';
import EditPermissionButton from './EditPermissionButton';
import { StyledTableRow } from './StyledTableRow';
import { useChangePermission } from './useChangePermission';

const ItemMembershipTableRow = ({
  allowDowngrade = false,
  isOnlyAdmin = false,
  item,
  data,
  isDisabled,
}: {
  data: ItemMembership;
  item: DiscriminatedItem;
  allowDowngrade?: boolean;
  isOnlyAdmin?: boolean;
  isDisabled: boolean;
}): JSX.Element => {
  const { t: translateEnums } = useTranslation(NS.Enums);
  const { changePermission, isPending } = useChangePermission({
    itemId: item.id,
    itemPath: item.path,
  });

  return (
    <StyledTableRow data-cy={buildItemMembershipRowId(data.id)} key={data.id}>
      <TableCell>
        <Typography
          noWrap
          sx={{ color: isDisabled ? DEFAULT_TEXT_DISABLED_COLOR : undefined }}
          fontWeight="bold"
        >
          {data.account.name}
        </Typography>
        <Typography
          noWrap
          variant="subtitle2"
          sx={{ color: isDisabled ? DEFAULT_TEXT_DISABLED_COLOR : undefined }}
        >
          {data.account.type === AccountType.Individual && data.account.email}
        </Typography>
      </TableCell>
      <TableCell align="right">
        <Typography>
          {isDisabled ? (
            <Typography sx={{ color: DEFAULT_TEXT_DISABLED_COLOR }}>
              {translateEnums(ItemLoginSchemaStatus.Disabled)}
            </Typography>
          ) : (
            translateEnums(data.permission)
          )}
        </Typography>
      </TableCell>
      <TableCell align="right">
        {!isOnlyAdmin && (
          <EditPermissionButton
            name={data.account.name}
            email={
              data.account.type === AccountType.Individual
                ? data.account.email
                : undefined
            }
            loading={isPending}
            handleUpdate={(newPermission) =>
              changePermission(data, newPermission)
            }
            allowDowngrade={allowDowngrade}
            permission={data.permission}
            id={buildItemMembershipRowEditButtonId(data.id)}
          />
        )}
        {!isOnlyAdmin && allowDowngrade && (
          <DeleteItemMembershipButton itemId={item.id} data={data} />
        )}
      </TableCell>
    </StyledTableRow>
  );
};

export default ItemMembershipTableRow;
