import { type JSX } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Alert,
  Button,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

import { formatDate, formatFileSize } from '@graasp/sdk';

import { useInfiniteQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';

import { NS } from '@/config/constants';
import {
  MEMBER_STORAGE_FILE_NAME_ID,
  MEMBER_STORAGE_FILE_SIZE_ID,
  MEMBER_STORAGE_FILE_UPDATED_AT_ID,
  MEMBER_STORAGE_PARENT_FOLDER_ID,
  getCellId,
} from '@/config/selectors';
import { getStorageFiles } from '@/openapi/client';
import { getStorageFilesOptions } from '@/openapi/client/@tanstack/react-query.gen';

const PAGE_SIZE = 10;

export const StorageFiles = (): JSX.Element | null => {
  const { t, i18n } = useTranslation(NS.Account);
  const { data, isPending, hasNextPage, fetchNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: getStorageFilesOptions({
        query: { pageSize: PAGE_SIZE, page: 1 },
      }).queryKey,
      queryFn: async ({ pageParam }) =>
        (
          await getStorageFiles({
            query: { page: pageParam ?? 1, pageSize: PAGE_SIZE },
          })
        ).data,
      getNextPageParam: (lastPage, pages) => {
        return lastPage && lastPage.data.length < PAGE_SIZE
          ? undefined
          : pages.length + 1;
      },
      refetchOnWindowFocus: () => false,
      initialPageParam: 1,
    });

  if (data) {
    if (data.pages.length === 0) {
      return <Alert severity="info">{t('MEMBER_STORAGE_FILES_EMPTY')}</Alert>;
    }

    const files = data.pages.flatMap((page) => page?.data ?? []);

    return (
      <>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('MEMBER_STORAGE_FILE_NAME')}</TableCell>
              <TableCell>{t('MEMBER_STORAGE_FILE_SIZE')}</TableCell>
              <TableCell>{t('MEMBER_STORAGE_FILE_UPDATED_AT')}</TableCell>
              <TableCell>{t('MEMBER_STORAGE_PARENT_FOLDER')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {files.map((file) => (
              <TableRow key={file.id}>
                <TableCell
                  id={getCellId(`${MEMBER_STORAGE_FILE_NAME_ID}`, file.id)}
                >
                  <Link
                    to="/builder/items/$itemId"
                    params={{ itemId: file.id }}
                  >
                    {file.name}
                  </Link>
                </TableCell>
                <TableCell
                  id={getCellId(`${MEMBER_STORAGE_FILE_SIZE_ID}`, file.id)}
                >
                  {formatFileSize(file.size)}
                </TableCell>
                <TableCell
                  id={getCellId(
                    `${MEMBER_STORAGE_FILE_UPDATED_AT_ID}`,
                    file.id,
                  )}
                >
                  {formatDate(file.updatedAt, { locale: i18n.language })}
                </TableCell>
                <TableCell
                  id={getCellId(`${MEMBER_STORAGE_PARENT_FOLDER_ID}`, file.id)}
                >
                  {file.parent?.name ?? t('MEMBER_STORAGE_NO_PARENT')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {hasNextPage && (
          <Stack textAlign="center" alignItems="center">
            <Button
              loading={isFetching}
              variant="outlined"
              onClick={() => fetchNextPage()}
              role="feed"
            >
              {t('STORAGE_LOAD_MORE_FILES')}
            </Button>
          </Stack>
        )}
      </>
    );
  }

  if (isPending) {
    return <Skeleton />;
  }

  return <Alert severity="error">{t('MEMBER_STORAGE_FILES_ERROR')}</Alert>;
};
