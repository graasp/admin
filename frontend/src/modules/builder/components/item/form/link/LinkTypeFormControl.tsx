import { useEffect, useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  FormControl,
  FormControlLabel,
  Link,
  Radio,
  RadioGroup,
  Typography,
  styled,
} from '@mui/material';

import {
  ItemType,
  UnionOfConst,
  buildLinkExtra,
  getLinkThumbnailUrl,
} from '@graasp/sdk';

import { useQuery } from '@tanstack/react-query';

import { NS } from '@/config/constants';
import { getLinkMetadataOptions } from '@/openapi/client/@tanstack/react-query.gen';
import LinkCard from '@/ui/Card/LinkCard';
import LinkItem from '@/ui/items/LinkItem';

import { isUrlValid } from '~builder/utils/item';

import { BUILDER } from '../../../../langs';
import { LinkType, normalizeURL } from './linkUtils';

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  // remove weird default margins on label
  margin: 0,
  padding: theme.spacing(2),
  borderRadius: theme.spacing(2),
  // this allows to apply a style to the current element if it contains an input element that is checked
  '&:has(input:checked)': {
    // here we added a bit of opacity to the color used on the background of the icons cards
    backgroundColor: '#E4DFFFB3',
  },
}));

const StyledDiv = styled('div')(() => ({
  '& > div': {
    height: '200px !important',
    paddingBottom: '0 !important',
  },
}));

export function LinkTypeFormControl() {
  const { control, watch, getValues, setValue } = useFormContext<{
    linkType: UnionOfConst<typeof LinkType>;
    url: string;
    description: string;
    name: string;
  }>();
  const { t } = useTranslation(NS.Builder);

  const description = watch('description');
  const url = watch('url');
  const isValidUrl = isUrlValid(normalizeURL(url));
  const { data: linkData } = useQuery(
    getLinkMetadataOptions({
      query: { link: isValidUrl ? normalizeURL(url) : '' },
    }),
  );

  // apply the description from the api to the field
  useEffect(
    () => {
      const { name } = getValues();
      if (!description && linkData?.description) {
        setValue('description', linkData.description, {
          shouldValidate: true,
          shouldDirty: true,
        });
      }
      if (!name && linkData?.title) {
        setValue('name', linkData.title, {
          shouldValidate: true,
          shouldDirty: true,
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [linkData],
  );

  const embeddedLinkPreview = useMemo(
    () => (
      <LinkItem
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        item={{
          type: ItemType.LINK,
          settings: {},
          extra: { [ItemType.LINK]: { url: normalizeURL(url) } },
        }}
        showIframe
        showButton={false}
        height="200px"
      />
    ),
    [url],
  );

  if (isValidUrl) {
    const thumbnail = linkData
      ? getLinkThumbnailUrl(buildLinkExtra({ ...linkData, url }))
      : undefined;

    if (url) {
      return (
        <FormControl>
          <Typography variant="caption">
            {t(BUILDER.CREATE_ITEM_LINK_TYPE_TITLE)}
          </Typography>
          <Controller
            control={control}
            defaultValue={LinkType.Default}
            name="linkType"
            render={({ field }) => (
              <RadioGroup sx={{ display: 'flex', gap: 2 }} {...field}>
                <StyledFormControlLabel
                  value={LinkType.Default}
                  label={<Link href={url}>{url}</Link>}
                  control={<Radio />}
                />
                <StyledFormControlLabel
                  value={LinkType.Fancy}
                  label={
                    <LinkCard
                      title={linkData?.title ?? ''}
                      url={url}
                      thumbnail={thumbnail}
                      description={description || ''}
                    />
                  }
                  control={<Radio />}
                  slotProps={{
                    typography: { width: '100%', minWidth: '0px' },
                  }}
                  sx={{ minWidth: '0px', width: '100%' }}
                />
                {linkData?.html && linkData.html !== '' && (
                  <StyledFormControlLabel
                    value={LinkType.Embedded}
                    label={
                      <StyledDiv
                        sx={{}}
                        dangerouslySetInnerHTML={{
                          __html: linkData.html,
                        }}
                      />
                    }
                    control={<Radio />}
                    slotProps={{
                      typography: {
                        width: '100%',
                        minWidth: '0px',
                      },
                    }}
                  />
                )}
                {
                  // only show this options when embedding is allowed and there is no html code
                  // as the html will take precedence over showing the site as an iframe
                  // and some sites like daily motion actually allow both, we want to allow show the html setting
                  linkData?.isEmbeddingAllowed && !linkData?.html && (
                    <StyledFormControlLabel
                      value={LinkType.Embedded}
                      label={embeddedLinkPreview}
                      control={<Radio />}
                      slotProps={{
                        typography: {
                          width: '100%',
                          minWidth: '0px',
                        },
                      }}
                      sx={{
                        // this ensure the iframe takes up all horizontal space
                        '& iframe': {
                          width: '100%',
                        },
                      }}
                    />
                  )
                }
              </RadioGroup>
            )}
          />
        </FormControl>
      );
    }
  }

  return null;
}
