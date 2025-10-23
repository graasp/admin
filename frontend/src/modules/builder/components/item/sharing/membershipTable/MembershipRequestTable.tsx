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
  Typography,
} from '@mui/material';

import { formatDate } from '@graasp/sdk';

import { Check } from 'lucide-react';

import { NS } from '@/config/constants';
import {
  MEMBERSHIP_REQUESTS_EMPTY_SELECTOR,
  MEMBERSHIP_REQUEST_ACCEPT_BUTTON_SELECTOR,
  MEMBERSHIP_REQUEST_REJECT_BUTTON_SELECTOR,
  buildMembershipRequestRowSelector,
} from '@/config/selectors';
import Button from '@/ui/buttons/Button/Button';

import ErrorAlert from '~builder/components/common/ErrorAlert';
import { useOutletContext } from '~builder/contexts/OutletContext';
import { BUILDER } from '~builder/langs';

import { StyledTableRow } from './StyledTableRow';
import { useMembershipRequests } from './useMembershipRequests';

const MembershipRequestTable = (): JSX.Element => {
  const { t: translateBuilder, i18n } = useTranslation(NS.Builder);
  const { item, canAdmin } = useOutletContext();
  const { requests, isPending, acceptRequest, refuseRequest } =
    useMembershipRequests({
      itemId: item.id,
      canAdmin,
    });

  if (requests?.length) {
    return (
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>
                {translateBuilder(BUILDER.ITEM_MEMBERSHIPS_TABLE_MEMBER_HEADER)}
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="right">
                {translateBuilder(
                  BUILDER.MEMBERSHIPS_REQUEST_TABLE_CREATED_AT_HEADER,
                )}
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="right">
                {translateBuilder(
                  BUILDER.ITEM_MEMBERSHIPS_TABLE_ACTIONS_HEADER,
                )}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests?.map((r) => (
              <StyledTableRow
                data-cy={buildMembershipRequestRowSelector(r.member.id)}
                key={r.member.id}
              >
                <TableCell>
                  <Typography noWrap fontWeight="bold">
                    {r.member.name}
                  </Typography>
                  <Typography noWrap variant="subtitle2">
                    {r.member.email}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography noWrap variant="subtitle2">
                    {formatDate(r.createdAt, { locale: i18n.language })}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Button
                    data-cy={MEMBERSHIP_REQUEST_ACCEPT_BUTTON_SELECTOR}
                    size="small"
                    color="success"
                    onClick={() => {
                      acceptRequest(r.member.id);
                    }}
                    endIcon={<Check size={20} />}
                  >
                    {translateBuilder(BUILDER.MEMBERSHIP_REQUEST_ACCEPT_BUTTON)}
                  </Button>
                  <Button
                    data-cy={MEMBERSHIP_REQUEST_REJECT_BUTTON_SELECTOR}
                    size="small"
                    color="error"
                    variant="text"
                    onClick={() => refuseRequest(r.member.id)}
                  >
                    {translateBuilder(BUILDER.MEMBERSHIP_REQUEST_REJECT_BUTTON)}
                  </Button>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  if (requests?.length === 0) {
    return (
      <Typography data-cy={MEMBERSHIP_REQUESTS_EMPTY_SELECTOR}>
        {translateBuilder(BUILDER.MEMBERSHIP_REQUESTS_TABLE_EMPTY)}
      </Typography>
    );
  }

  if (isPending) {
    return (
      <>
        <Skeleton height="60" />
        <Skeleton height="60" />
        <Skeleton height="60" />
      </>
    );
  }

  return <ErrorAlert />;
};

export default MembershipRequestTable;
