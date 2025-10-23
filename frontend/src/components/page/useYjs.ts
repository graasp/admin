/**
 * source: lexical
 */
import { useCallback, useEffect, useState } from 'react';

import { Provider } from '@lexical/yjs';
import { differenceInSeconds } from 'date-fns';
import { WebsocketProvider } from 'y-websocket';
import { Doc } from 'yjs';

import { WS_HOST } from '@/config/env';

/** Compare consecutive disconnection times  */
const DISCONNECTION_ATTEMPT_RANGE = 5;

export const useYjs = ({ edit }: { edit: boolean }) => {
  const [disconnectedTimestamps, setDisconnectedTimestamps] = useState<Date[]>(
    [],
  );
  const [yjsProvider, setYjsProvider] = useState<null | Provider>(null);
  const [connected, setConnected] = useState(false);
  const [activeUsers, setActiveUsers] = useState<
    { name: string; color: string }[]
  >([]);

  const handleAwarenessUpdate = useCallback(() => {
    if (edit) {
      const awareness = yjsProvider!.awareness!;
      setActiveUsers(
        Array.from(awareness.getStates().entries()).map(
          ([userId, { color, name }]) => ({
            color,
            name,
            userId,
          }),
        ),
      );
    }
  }, [edit, yjsProvider]);

  useEffect(() => {
    if (yjsProvider == null) {
      return;
    }

    if (edit) {
      yjsProvider.awareness.on('update', handleAwarenessUpdate);

      return () => yjsProvider.awareness.off('update', handleAwarenessUpdate);
    }
  }, [yjsProvider, handleAwarenessUpdate, edit]);

  const providerFactory = useCallback(
    (id: string, yjsDocMap: Map<string, Doc>) => {
      const provider = createWebsocketProvider(
        id,
        yjsDocMap,
        edit,
      ) as unknown as Provider;
      provider.on('status', (event) => {
        setConnected(
          // Websocket provider
          event.status === 'connected' ||
            // WebRTC provider has different approact to status reporting
            ('connected' in event && event.connected === true),
        );

        if (event.status === 'disconnected') {
          // keep track of 10 last deconnection dates
          setDisconnectedTimestamps((arr) =>
            arr.concat([new Date()]).slice(-10),
          );
        }
      });

      // This is a hack to get reference to provider with standard CollaborationPlugin.
      // To be fixed in future versions of Lexical.
      setTimeout(() => setYjsProvider(provider), 0);

      return provider;
    },
    [edit],
  );

  // fallback if connection is going crazy
  // eg. connection attemps happens very quickly
  const [hasTimedOut, setHasTimeout] = useState(false);
  useEffect(() => {
    if (
      !hasTimedOut &&
      disconnectedTimestamps.length > DISCONNECTION_ATTEMPT_RANGE
    ) {
      const lastDisconnections = disconnectedTimestamps.slice(
        -DISCONNECTION_ATTEMPT_RANGE,
      );

      // can try out n connections within 2 seconds before timeout
      if (
        differenceInSeconds(
          new Date(lastDisconnections[DISCONNECTION_ATTEMPT_RANGE - 1]),
          new Date(disconnectedTimestamps[0]),
        ) < 2
      ) {
        // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
        setHasTimeout(true);
      }
    }
  }, [disconnectedTimestamps, hasTimedOut]);

  return {
    providerFactory,
    activeUsers,
    connected,
    hasTimedOut,
  };
};

export function createWebsocketProvider(
  id: string,
  yjsDocMap: Map<string, Doc>,
  edit: boolean,
) {
  const doc = getDocFromMap(id, yjsDocMap);

  return new WebsocketProvider(
    WS_HOST,
    edit ? `items/pages/${id}/ws` : `items/pages/${id}/ws/read`,
    doc,
    {
      // connect manually using wsProvider.connect()
      connect: false,
    },
  );
}

function getDocFromMap(id: string, yjsDocMap: Map<string, Doc>): Doc {
  let doc = yjsDocMap.get(id);
  if (doc === undefined) {
    doc = new Doc();
    yjsDocMap.set(id, doc);
  } else {
    doc.load();
  }

  return doc;
}
