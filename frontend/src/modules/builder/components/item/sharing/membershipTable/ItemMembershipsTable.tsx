import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import {
  AccountType,
  ItemLoginSchemaStatus,
  PermissionLevel,
  PermissionLevelCompare,
} from '@graasp/sdk';

import groupby from 'lodash.groupby';

import { useAuth } from '@/AuthContext';
import { NS } from '@/config/constants';
import { hooks } from '@/config/queryClient';
import { useItemInvitations } from '@/query/hooks/invitation';

import ErrorAlert from '~builder/components/common/ErrorAlert';
import { useOutletContext } from '~builder/contexts/OutletContext';

import { BUILDER } from '../../../../langs';
import GuestItemMembershipTableRow from './GuestItemMembershipTableRow';
import InvitationTableRow from './InvitationTableRow';
import ItemMembershipTableRow from './ItemMembershipTableRow';
import { useHighestMemberships } from './useHighestMemberships';

type Props = {
  showEmail?: boolean;
};

const EMPTY_NAME_VALUE = '-';

// sort by name, email
// empty names should be at the end
// sorting by permission is done in the splitting below
const sortByNameAndEmail = (
  d1: { name: string; email: string },
  d2: { name: string; email: string },
) => {
  if (d1.name === d2.name) {
    return d1.email > d2.email ? 1 : -1;
  }
  if (d1.name === EMPTY_NAME_VALUE) {
    return 1;
  }
  if (d2.name === EMPTY_NAME_VALUE) {
    return -1;
  }
  return d1.name > d2.name ? 1 : -1;
};

const ItemMembershipsTable = ({ showEmail = true }: Props): JSX.Element => {
  const { t: translateBuilder } = useTranslation(NS.Builder);

  const { item, canAdmin } = useOutletContext();
  const { data: invitations, isPending: isInvitationsPending } =
    useItemInvitations(item.id, {
      enabled: canAdmin,
    });
  const {
    data: memberships,
    hasOnlyOneAdmin,
    isPending: isMembershipsPending,
  } = useHighestMemberships({ canAdmin, item });

  const { data: itemLoginSchema } = hooks.useItemLoginSchema({
    itemId: item.id,
  });
  const { user } = useAuth();

  const itemLoginSchemaIsDisabled =
    !itemLoginSchema ||
    itemLoginSchema.status === ItemLoginSchemaStatus.Disabled;

  if (memberships) {
    // map memberships to corresponding row layout and meaningful data to sort
    const membershipsRows = memberships.map((im) => ({
      name: im.account.name,
      email:
        im.account.type === AccountType.Individual ? im.account.email : '-',
      permission: im.permission,
      component:
        im.account.type === AccountType.Individual ? (
          <ItemMembershipTableRow
            key={im.id}
            data={im}
            item={item}
            isOnlyAdmin={
              hasOnlyOneAdmin && im.permission === PermissionLevel.Admin
            }
            allowDowngrade={
              // can downgrade for same item
              im.item.path === item.path
            }
            isDisabled={
              Boolean(item.hidden) &&
              PermissionLevelCompare.lt(im.permission, PermissionLevel.Write)
            }
          />
        ) : (
          <GuestItemMembershipTableRow
            key={im.id}
            itemId={item.id}
            data={im}
            isDisabled={
              Boolean(item.hidden) ||
              (user?.id !== im.account.id && itemLoginSchemaIsDisabled)
            }
          />
        ),
    }));

    // map invitations to row layout and meaningful data to sort
    const invitationsRows =
      invitations?.map((r) => ({
        name: r.name ?? EMPTY_NAME_VALUE,
        email: r.email,
        permission: r.permission,
        component: <InvitationTableRow key={r.id} item={item} data={r} />,
      })) ?? [];

    // split per permission to add divider between sections
    const groupedRows = groupby(
      [...membershipsRows, ...invitationsRows],
      ({ permission }) => permission,
    );

    const adminRows =
      groupedRows[PermissionLevel.Admin]?.toSorted(sortByNameAndEmail);
    const writeRows =
      groupedRows[PermissionLevel.Write]?.toSorted(sortByNameAndEmail);
    const readRows =
      groupedRows[PermissionLevel.Read]?.toSorted(sortByNameAndEmail);
    const allRows = [adminRows, writeRows, readRows]
      .filter(Boolean)
      .flatMap((rows) => [
        <TableRow>
          <TableCell colSpan={5} sx={{ padding: 0 }} />
        </TableRow>,
        ...rows.map((r) => r.component),
      ])
      .slice(1);

    if (allRows) {
      return (
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                {showEmail && (
                  <TableCell sx={{ fontWeight: 'bold' }}>
                    {translateBuilder(
                      BUILDER.ITEM_MEMBERSHIPS_TABLE_MEMBER_HEADER,
                    )}
                  </TableCell>
                )}
                <TableCell sx={{ fontWeight: 'bold' }} align="right">
                  {translateBuilder(
                    BUILDER.ITEM_MEMBERSHIPS_TABLE_PERMISSION_HEADER,
                  )}
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="right">
                  {translateBuilder(
                    BUILDER.ITEM_MEMBERSHIPS_TABLE_ACTIONS_HEADER,
                  )}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{allRows.map((el) => el)}</TableBody>
          </Table>
        </TableContainer>
      );
    }
  }

  if (isMembershipsPending || isInvitationsPending) {
    return <Skeleton />;
  }

  return <ErrorAlert />;
};

export default ItemMembershipsTable;
