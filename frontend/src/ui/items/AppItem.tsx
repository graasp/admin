import { type JSX, memo, useMemo, useRef, useState } from 'react';

import { Skeleton, styled } from '@mui/material';

import {
  AppItemType,
  Member,
  appendQueryParamToUrl,
  getAppExtra,
} from '@graasp/sdk';

import withCollapse from '../Collapse/withCollapse.js';
import { SCREEN_MAX_HEIGHT } from '../constants.js';
import { ContextPayload, Token, useAppCommunication } from './appItemHooks.js';
import { iframeCommonStyles } from './iframeStyles.js';
import withCaption from './withCaption.js';
import withResizing from './withResizing.js';

const AppIFrame = styled('iframe')<{
  isResizable?: boolean;
}>(({ isResizable, height }) => ({
  ...iframeCommonStyles,
  /**
   * IMPORTANT The height set here will have a class precedence.
   * The auto height hook will set the height on the style property
   *  of the element itself giving it a higher precedence
   * thus overriding this value. This is what we want.
   */
  height: !isResizable ? height : '100%',
  width: '100%',
}));

const DEFAULT_RESIZING_HEIGHT = 400;
/**
 * This query param is added to the fetched url to fix an issue where the browser
 * is able to aggressively cache the `index.html` file for the app.
 * This aggressive caching behavior is an issue as when apps get updated, the index.html file
 * changes but the browser has an old version of it, and tries to fetch javascript and assets that are out of date
 * resulting in the app not being able to load.
 *
 * This could be also fixed by not overriding the `index.html` file when releasing a new app version
 * and simply pushing it to another subpath than `/latest/`. In this case the agressive caching behavior would not be a problem.
 */
export const CURRENT_TIMESTAMP_QUERY_PARAM = 'ts';

type AppItemProps = {
  /**
   * corresponding item of the app
   */
  item: AppItemType;
  /**
   * function to fetch the app token
   */
  requestApiAccessToken: (args: {
    id: string;
    key: string;
    origin: string;
  }) => Promise<{ token: Token }>;
  /**
   * context passed to the app
   */
  contextPayload: ContextPayload;
  /**
   * app height
   */
  height?: number | string;
  /**
   * id prop passed to the iframe
   */
  frameId?: string;
  /**
   * Whether manual resize is enabled (as opposed to automatic resize, default)
   */
  isResizable?: boolean;
  /**
   * id of the member currently signed in
   */
  memberId?: Member['id'];
  /**
   * Whether the caption is shown
   */
  showCaption?: boolean;
  /**
   * Whether the item should be shown in a collapsible element
   */
  showCollapse?: boolean;
  onCollapse?: (c: boolean) => void;
};

const AppItem = ({
  item,
  contextPayload,
  requestApiAccessToken,
  height,
  frameId,
  memberId,
  isResizable = false,
  showCaption = true,
  showCollapse = false,
  onCollapse,
}: AppItemProps): JSX.Element => {
  // state
  const [isIFrameLoading, setIsIFrameLoading] = useState(true);
  const iFrameRef = useRef<HTMLIFrameElement>(null);
  const appUrl = getAppExtra(item.extra)?.url || '';

  useAppCommunication({
    item,
    appUrl,
    iFrameRef,
    contextPayload,
    requestApiAccessToken,
  });

  const onLoad = (): void => setIsIFrameLoading(false);

  const appUrlWithQuery = useMemo(
    () =>
      appendQueryParamToUrl(appUrl, {
        itemId: item.id,
        // this ensures that the index.html can not be aggressively cached by the browser
        [CURRENT_TIMESTAMP_QUERY_PARAM]: Date.now().toString(),
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [item],
  );

  const iframe = (
    <AppIFrame
      data-testid={frameId}
      id={frameId}
      ref={iFrameRef}
      isResizable={isResizable}
      onLoad={onLoad}
      src={appUrlWithQuery}
      sx={{ visibility: isIFrameLoading ? 'hidden' : 'visible' }}
      title={item?.name}
      height={height ?? '80vh'}
      allow="fullscreen"
    />
  );

  const ResizableIframe = withResizing({
    height: height ?? DEFAULT_RESIZING_HEIGHT,
    memberId: memberId,
    itemId: item.id,
    component: iframe,
  });

  let component = (
    <>
      {isIFrameLoading && (
        <Skeleton
          variant="rectangular"
          width={'100%'}
          height={SCREEN_MAX_HEIGHT}
        />
      )}
      {isResizable ? <ResizableIframe /> : iframe}
    </>
  );

  if (showCaption) {
    component = withCaption({
      item,
    })(component);
  }

  if (showCollapse) {
    component = withCollapse({ item, onCollapse })(component);
  }

  return component;
};

export default memo(AppItem);
