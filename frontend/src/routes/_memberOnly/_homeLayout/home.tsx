import { Divider, Stack, useMediaQuery, useTheme } from '@mui/material';

import { createFileRoute } from '@tanstack/react-router';

import { MaintenanceAnnouncement } from '@/modules/home/MaintenanceAnnouncement';
import SurveyBanner from '@/modules/home/SurveyBanner';
import { BookmarkedItems } from '@/modules/home/bookmarks/BookmarkedItems';

import { FilterItemsContextProvider } from '~builder/components/context/FilterItemsContext';
import { useItemSearch } from '~builder/components/item/ItemSearch';
import { NewFolderButton } from '~builder/components/item/form/folder/NewFolderButton';
import { SelectionContextProvider } from '~builder/components/main/list/SelectionContext';
import { HomeScreenContent } from '~builder/components/pages/home/HomeScreenContent';

export const Route = createFileRoute('/_memberOnly/_homeLayout/home')({
  component: HomeRoute,
  staticData: { pageTitle: 'MY_GRAASP' },
});

function HomeRoute() {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'));

  const itemSearch = useItemSearch();

  return (
    <>
      <MaintenanceAnnouncement suffix="home" />
      <SurveyBanner />
      <BookmarkedItems />
      <Divider flexItem />
      <SelectionContextProvider>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          spacing={1}
        >
          {itemSearch.input}
          <NewFolderButton type={isMd ? 'button' : 'icon'} />
        </Stack>
        <FilterItemsContextProvider>
          <HomeScreenContent searchText={itemSearch.text} />
        </FilterItemsContextProvider>
      </SelectionContextProvider>
    </>
  );
}
