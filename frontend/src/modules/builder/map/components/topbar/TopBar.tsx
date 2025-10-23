import type { JSX } from 'react';

import { Divider, Stack } from '@mui/material';

import { useMobileView } from '@/ui/hooks/useMobileView';

import GeolocationPicker, {
  GeolocationPickerProps,
} from '../GeolocationPicker/GeolocationPicker';
import { useQueryClientContext } from '../context/QueryClientContext';
import MobileTopBar from './MobileTopBar';
import Search from './Search';

const TopBar = ({
  onChange,
  tags,
  onChangeOption,
}: {
  tags: string[];
  onChange: (tags: string[]) => void;
  onChangeOption: GeolocationPickerProps['onChangeOption'];
}): JSX.Element => {
  const { currentMember, useSuggestionsForAddress } = useQueryClientContext();

  const { isMobile } = useMobileView();

  if (isMobile) {
    return (
      <MobileTopBar
        tags={tags}
        onChange={onChange}
        onChangeOption={onChangeOption}
      />
    );
  }

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      p={2}
      // allow the bar to be 80% of the width and be centered
      width="80%"
      zIndex={450}
      position="absolute"
      // constrain to both borders and add auto margins to center
      left={0}
      right={0}
      m="auto"
    >
      <Stack
        sx={{
          background: 'white',
          borderRadius: '10px',
          boxShadow: '0 3px 15px rgba(0,0,0,0.5)',
        }}
        direction="row"
        gap={2}
        p={2}
        width="100%"
        divider={<Divider orientation="vertical" flexItem />}
      >
        {currentMember ? (
          <GeolocationPicker
            onChangeOption={onChangeOption}
            invisible
            useSuggestionsForAddress={useSuggestionsForAddress}
          />
        ) : null}
        <Search invisible tags={tags} onChange={onChange} />
      </Stack>
    </Stack>
  );
};
export default TopBar;
