import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { TableCell, Typography } from '@mui/material';

import {
  DiscriminatedItem,
  Invitation,
  PermissionLevelOptions,
} from '@graasp/sdk';

import { NS } from '@/config/constants';
import { mutations } from '@/config/queryClient';
import {
  buildInvitationTableRowId,
  buildItemInvitationRowDeleteButtonId,
} from '@/config/selectors';

import { BUILDER } from '~builder/langs';

import EditPermissionButton from './EditPermissionButton';
import ResendInvitation from './ResendInvitation';
import { StyledTableRow } from './StyledTableRow';
import TableRowDeleteButton from './TableRowDeleteButton';

const InvitationTableRow = ({
  data,
  item,
}: {
  item: DiscriminatedItem;
  data: Invitation;
}): JSX.Element => {
  const { t: translateEnums } = useTranslation(NS.Enums);
  const { t: translateBuilder } = useTranslation(NS.Builder);

  const { mutate: editInvitation, isPending: isPendingEditInvitation } =
    mutations.usePatchInvitation();
  const { mutate: postInvitations, isPending: isPendingPostInvitation } =
    mutations.usePostInvitations();
  const { mutate: deleteInvitation } = mutations.useDeleteInvitation();

  const changePermission = async (permission: PermissionLevelOptions) => {
    if (data.item.path === item.path) {
      editInvitation({
        id: data.id,
        permission,
        itemId: item.id,
      });
    } else {
      postInvitations({
        itemId: item.id,
        invitations: [
          {
            email: data.email,
            permission,
          },
        ],
      });
    }
  };

  return (
    <StyledTableRow id={buildInvitationTableRowId(data.id)}>
      <TableCell>
        <Typography noWrap fontWeight="bold">
          ({data.name ?? translateBuilder(BUILDER.INVITATION_NOT_REGISTER_TEXT)}
          )
        </Typography>
        <Typography noWrap variant="subtitle2">
          {data.email}
        </Typography>
      </TableCell>
      <TableCell align="right">
        <Typography>{translateEnums(data.permission)}</Typography>
      </TableCell>
      <TableCell align="right">
        <ResendInvitation invitationId={data.id} itemId={item.id} />
        <EditPermissionButton
          permission={data.permission}
          email={data.email}
          name={data.name}
          handleUpdate={changePermission}
          allowDowngrade={data.item.path === item.path}
          loading={isPendingEditInvitation || isPendingPostInvitation}
        />
        <TableRowDeleteButton
          id={buildItemInvitationRowDeleteButtonId(data.id)}
          tooltip={translateBuilder(BUILDER.INVITATION_DELETE_TOOLTIP)}
          onClick={() => deleteInvitation({ id: data.id, itemId: item.id })}
          disabled={data.item.path !== item.path}
        />
      </TableCell>
    </StyledTableRow>
  );
};

export default InvitationTableRow;
