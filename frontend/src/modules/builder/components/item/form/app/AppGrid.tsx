import type { JSX } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Alert } from '@mui/material';

import { useQuery } from '@tanstack/react-query';

import { NS } from '@/config/constants';
import { getAppListOptions } from '@/openapi/client/@tanstack/react-query.gen';

import AppCard from '~builder/components/main/AppCard';
import { sortByName } from '~builder/utils/item';

import { BUILDER } from '../../../../langs';

type AppGridProps = {
  searchQuery?: string;
};

export function AppGrid({
  searchQuery,
}: Readonly<AppGridProps>): JSX.Element | JSX.Element[] {
  const { data, isLoading } = useQuery(getAppListOptions());
  const { control, reset } = useFormContext<{
    url: string;
    name: string;
  }>();

  const { t: translateBuilder } = useTranslation(NS.Builder);

  if (data) {
    // filter out with search query
    const dataToShow = searchQuery
      ? data.filter((d) =>
          d.name.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : data;
    dataToShow.sort(sortByName);

    return (
      <Controller
        name="url"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <>
            {dataToShow.map((ele) => (
              <AppCard
                testId={ele.name}
                key={ele.name}
                name={ele.name}
                description={ele.description}
                image={ele.thumbnail}
                selected={ele.url === field.value}
                onClick={() => {
                  if (ele.url === field.value) {
                    // reset fields
                    reset({ name: '', url: '' });
                  } else {
                    // force render with reset
                    reset({ name: ele.name, url: ele.url });
                  }
                }}
              />
            ))}
          </>
        )}
      />
    );
  }

  if (isLoading) {
    return Array(7)
      .fill(0)
      .map((i) => <AppCard key={i} testId={i} />);
  }

  return (
    <Alert severity="error">
      {translateBuilder(BUILDER.APP_LIST_LOADING_FAILED)}
    </Alert>
  );
}
