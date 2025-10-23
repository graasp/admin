import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useQuery } from '@tanstack/react-query';

import { NS } from '@/config/constants';
import { getShortLinkAvailabilityOptions } from '@/openapi/client/@tanstack/react-query.gen';
import useDebounce from '@/query/hooks/useDebounce';

import { BUILDER } from '~builder/langs';
import { isValidAlias } from '~builder/utils/shortLink';

type Props = {
  alias: string;
  initialAlias: string;
  isNew: boolean;
};
const SHORT_LINK_API_CALL_DEBOUNCE_MS = 500;

export const useAliasValidation = ({ alias, isNew, initialAlias }: Props) => {
  const { t: translateBuilder } = useTranslation(NS.Builder);

  // check for the validity and availability of the alias
  const { isValid, messageKey, data } = isValidAlias(alias);
  const hasAliasChanged = isNew || initialAlias !== alias;

  // debounce alias value to avoid sending too many requests
  const debouncedAlias = useDebounce(alias, SHORT_LINK_API_CALL_DEBOUNCE_MS);
  const {
    data: shortLinkAvailable,
    isFetching: isAvailableLoading,
    isError,
  } = useQuery({
    ...getShortLinkAvailabilityOptions({ path: { alias: debouncedAlias } }),
    // check availability if alias is different from init value
    // once debounce is updated and if the alias is valid
    enabled:
      hasAliasChanged &&
      debouncedAlias === alias &&
      isValidAlias(debouncedAlias).isValid,
  });

  // enable loading when debounce and current alias are unsync
  const isLoading = isAvailableLoading || alias !== debouncedAlias;

  // build helper message
  const buildMessage = useCallback(() => {
    if (!isValid) {
      const msgKey = messageKey ?? BUILDER.SHORT_LINK_UNKNOWN_ERROR;
      return translateBuilder(msgKey, { data });
    } else if (!hasAliasChanged) {
      return translateBuilder(BUILDER.ALIAS_UNCHANGED_MSG);
    } else if (isLoading) {
      return translateBuilder(BUILDER.ALIAS_CHECKING_MSG);
    } else {
      const aliasAvailable = Boolean(shortLinkAvailable?.available);
      return aliasAvailable
        ? translateBuilder(BUILDER.ALIAS_VALID_MSG)
        : translateBuilder(BUILDER.ALIAS_ALREADY_EXIST);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    data,
    hasAliasChanged,
    isLoading,
    isValid,
    messageKey,
    shortLinkAvailable?.available,
  ]);

  return {
    isLoading,
    message: buildMessage(),
    isError:
      isError || (!isLoading && !shortLinkAvailable?.available) || !isValid,
    hasAliasChanged,
  };
};
