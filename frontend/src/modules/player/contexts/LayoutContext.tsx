import {
  Dispatch,
  type JSX,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useMobileView } from '@/ui/hooks/useMobileView';

type LayoutContextType = {
  isPinnedOpen: boolean;
  setIsPinnedOpen: Dispatch<SetStateAction<boolean>>;
  isChatboxOpen: boolean;
  setIsChatboxOpen: Dispatch<SetStateAction<boolean>>;
  isFullscreen: boolean;
  setIsFullscreen: Dispatch<SetStateAction<boolean>>;
  toggleChatbox: () => void;
  togglePinned: () => void;
};

const LayoutContext = createContext<LayoutContextType>({
  isPinnedOpen: true,
  setIsPinnedOpen: () => {
    throw new Error('No context');
  },
  isChatboxOpen: false,
  setIsChatboxOpen: () => {
    throw new Error('No context');
  },
  isFullscreen: false,
  setIsFullscreen: () => {
    throw new Error('No context');
  },
  toggleChatbox: () => {
    throw new Error('No context');
  },
  togglePinned: () => {
    throw new Error('No context');
  },
});

type Props = {
  children: JSX.Element;
};

export const LayoutContextProvider = ({ children }: Props): JSX.Element => {
  const { isMobile } = useMobileView();

  const [isPinnedOpen, setIsPinnedOpen] = useState<boolean>(!isMobile);
  const [isChatboxOpen, setIsChatboxOpen] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  useEffect(() => {
    // TODO: fix this issue
    // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
    setIsPinnedOpen(!isMobile);
  }, [isMobile]);

  const value = useMemo(
    () => ({
      isPinnedOpen,
      setIsPinnedOpen,
      isChatboxOpen,
      setIsChatboxOpen,
      isFullscreen,
      setIsFullscreen,
      toggleChatbox: () => {
        setIsChatboxOpen((prev) => !prev);
        if (isPinnedOpen) {
          // close the pinned items
          setIsPinnedOpen(false);
        }
      },
      togglePinned: () => {
        setIsPinnedOpen((prev) => !prev);
        if (isChatboxOpen) {
          // close the chatbox items
          setIsChatboxOpen(false);
        }
      },
    }),
    [
      isPinnedOpen,
      setIsPinnedOpen,
      isChatboxOpen,
      setIsChatboxOpen,
      isFullscreen,
      setIsFullscreen,
    ],
  );
  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};

export const useLayoutContext = (): LayoutContextType =>
  useContext(LayoutContext);
