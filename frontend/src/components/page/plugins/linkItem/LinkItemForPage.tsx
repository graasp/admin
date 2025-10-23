import { JSX, MouseEventHandler, memo, useEffect, useState } from 'react';

import { Alert, Box, Link as MUILink, Skeleton } from '@mui/material';

import { useLexicalNodeSelection } from '@lexical/react/useLexicalNodeSelection';
import { useQuery } from '@tanstack/react-query';
import { type ElementFormatType, type NodeKey } from 'lexical';

import { getLinkMetadataOptions } from '@/openapi/client/@tanstack/react-query.gen';
import LinkCard from '@/ui/Card/LinkCard';
import { LinkIframe } from '@/ui/items/LinkItem';

import { BlockWithAlignement } from '../../BlockWithAlignment';
import { NodeMenu } from '../../NodeMenu';
import { Layout } from './LinkItemNode';
import { LinkItemType } from './menu/LinkItemType';
import { useLinkItemMenuUrl } from './menu/useLinkItemMenuUrl';

function isURLExternal(url: string): boolean {
  try {
    return new URL(url).origin !== window.location.origin;
  } catch {
    return false;
  }
}

function LinkItem({
  url,
  layout,
  isResizable,
  height,
  loadingMessage,
  errorMessage,
  nodeKey,
  memberId,
  onClick,
}: {
  url: string;
  layout: Layout;
  isResizable: boolean;
  height: string | number;
  loadingMessage: string;
  errorMessage?: string;
  nodeKey: NodeKey;
  memberId?: string;
  onClick?: MouseEventHandler;
}) {
  const { data: linkMetadata, isFetching } = useQuery(
    getLinkMetadataOptions({ query: { link: url } }),
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(
    () => {
      if (!isLoading) {
        // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
        setIsLoading(true);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [url],
  );

  if (!url) {
    return <Alert severity="error">{errorMessage}</Alert>;
  }

  if (layout === 'embed') {
    if (isFetching) {
      return <Skeleton height={height} />;
    }

    // for rich media we use the provided html
    // this is highly unsafe, and could allow XSS vulnerability if the backend does not protect this property
    const html = linkMetadata?.html;
    if (html) {
      return (
        <Box
          // this is allows for the box to not really exist and instead display the children box
          // we can not get rid of this div as we need a way to attach the onClick handler for registering actions
          display="contents"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    }

    return (
      <Box sx={{ position: 'relative' }}>
        {/* box above iframe to capture events */}
        <Box
          onClick={onClick}
          sx={{
            height,
            width: '100%',
            position: 'absolute',
            zIndex: 1,
          }}
        ></Box>
        <LinkIframe
          url={url}
          isResizable={isResizable}
          height={height}
          title={linkMetadata?.title ?? url}
          isLoading={isLoading}
          onDoneLoading={() => {
            setIsLoading(false);
          }}
          itemId={nodeKey}
          memberId={memberId}
          loadingMessage={loadingMessage}
        />
      </Box>
    );
  }

  if (layout === 'button') {
    const isExternal = isURLExternal(url);
    return (
      <LinkCard
        thumbnail={linkMetadata?.icons?.[0]}
        title={linkMetadata?.title ?? url}
        urlText={url}
        description=""
        isExternal={isExternal}
        onClick={onClick}
      />
    );
  }

  return <MUILink onClick={onClick}>{url}</MUILink>;
}

type LinkItemComponentProps = Readonly<{
  /**
   * lexical props
   */
  className: Readonly<{
    base: string;
    focus: string;
  }>;
  format: ElementFormatType;
  nodeKey: NodeKey;

  /**
   * lexical link props
   */
  layout: Layout;
  url: string;
  onLayoutChange: (layout: Layout) => void;
  onUrlChange: (url: string) => void;

  loadingComponent?: JSX.Element | string;
  memberId?: string;
  loadingMessage?: string;
  errorMessage?: string;
  isResizable?: boolean;
  height?: string | number;
  canEdit?: boolean;
  onClick?: MouseEventHandler;
}>;

export function LinkItemComponent({
  className,
  format,
  nodeKey,
  canEdit = true,
  url,
  layout,
  memberId,
  loadingMessage = 'Link is Loading...',
  height: defaultHeight = 400,
  errorMessage = 'The link is malformed.',
  onLayoutChange,
  onUrlChange,
  onClick,
}: LinkItemComponentProps) {
  const [height] = useState<string | number>(defaultHeight);
  const [isSelected] = useLexicalNodeSelection(nodeKey);
  // decuplated the url button from modal to allow modal to be opened while button is unmounted
  const { button: urlButton, modal: urlModal } = useLinkItemMenuUrl({
    url,
    onUrlChange,
  });

  return (
    <>
      {urlModal}
      <NodeMenu isSelected={canEdit && isSelected} format={format}>
        <LinkItemType layout={layout} onLayoutChange={onLayoutChange} />
        {urlButton}
      </NodeMenu>
      <BlockWithAlignement
        className={className}
        format={format}
        nodeKey={nodeKey}
      >
        <LinkItem
          onClick={onClick}
          url={url}
          layout={layout}
          isResizable
          height={height}
          loadingMessage={loadingMessage}
          errorMessage={errorMessage}
          nodeKey={nodeKey}
          memberId={memberId}
        />
      </BlockWithAlignement>
    </>
  );
}

export const LinkItemForPage = memo(LinkItemComponent);
