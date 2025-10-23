import type { JSX } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { Link as MuiLink, Typography } from '@mui/material';

import { createFileRoute } from '@tanstack/react-router';

import { NS, PRIVACY_EMAIL } from '@/config/constants';

import {
  EnumeratedParagraph,
  ListItem,
  ListedParagraph,
  Page,
  Paragraphs,
  Section,
  SubSection,
} from '~landing/privacyPolicy/layouts';

export const Route = createFileRoute('/_landing/policy')({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation(NS.Landing, { keyPrefix: 'PRIVACY_POLICY' });
  return (
    <Page title={t('TITLE')}>
      <WhoWeAre />
      <Responsibilities />
      <DataUsage />
      <DataCollection />
      <Cookies />
      <DataRetention />
      <DataSharing />
      <ServiceProviders />
      <Security />
      <YourRights />
      <PolicyChanges />
      <FinalProvisions />
    </Page>
  );
}

function WhoWeAre(): JSX.Element {
  const { t } = useTranslation(NS.Landing, {
    keyPrefix: 'PRIVACY_POLICY.SECTION_1',
  });
  return (
    <Section title={t('TITLE')}>
      <Paragraphs>
        <Typography>{t('DEFINITION')}</Typography>
        <Typography>{t('COMPLIANCE')}</Typography>
        <Typography>
          <Trans
            t={t}
            i18nKey="CONTACT"
            values={{ email: PRIVACY_EMAIL }}
            components={{ mail: <a href={`mailto:${PRIVACY_EMAIL}`}>_</a> }}
          />
        </Typography>
      </Paragraphs>
    </Section>
  );
}

function Responsibilities(): JSX.Element {
  const { t } = useTranslation(NS.Landing, {
    keyPrefix: 'PRIVACY_POLICY.RESPONSIBILITIES',
  });
  return (
    <Section title={t('TITLE')}>
      <SubSection title={t('USER_OBLIGATIONS.TITLE')}>
        <EnumeratedParagraph text={t('USER_OBLIGATIONS.TEXT')}>
          <ListItem>{t('USER_OBLIGATIONS.AGREEMENT_1')}</ListItem>
          <ListItem>{t('USER_OBLIGATIONS.AGREEMENT_2')}</ListItem>
          <ListItem>{t('USER_OBLIGATIONS.AGREEMENT_3')}</ListItem>
          <ListItem>{t('USER_OBLIGATIONS.AGREEMENT_4')}</ListItem>
          <ListItem>
            {t('USER_OBLIGATIONS.AGREEMENT_5')}
            <ListedParagraph>
              <ListItem>{t('USER_OBLIGATIONS.NOTIFICATION.CASE_1')}</ListItem>
              <ListItem>{t('USER_OBLIGATIONS.NOTIFICATION.CASE_2')}</ListItem>
              <ListItem>{t('USER_OBLIGATIONS.NOTIFICATION.CASE_3')}</ListItem>
            </ListedParagraph>
          </ListItem>
        </EnumeratedParagraph>
      </SubSection>
      <SubSection title={t('GRAASP_OBLIGATIONS.TITLE')}>
        <EnumeratedParagraph text={t('GRAASP_OBLIGATIONS.TEXT')}>
          <ListItem>{t('GRAASP_OBLIGATIONS.AGREEMENT_1')}</ListItem>
          <ListItem>{t('GRAASP_OBLIGATIONS.AGREEMENT_2')}</ListItem>
          <ListItem>{t('GRAASP_OBLIGATIONS.AGREEMENT_3')}</ListItem>
          <ListItem>{t('GRAASP_OBLIGATIONS.AGREEMENT_4')}</ListItem>
          <ListItem>{t('GRAASP_OBLIGATIONS.AGREEMENT_5')}</ListItem>
          <ListItem>{t('GRAASP_OBLIGATIONS.AGREEMENT_6')}</ListItem>
          <ListItem>{t('GRAASP_OBLIGATIONS.AGREEMENT_7')}</ListItem>
        </EnumeratedParagraph>
      </SubSection>
    </Section>
  );
}

export function DataUsage(): JSX.Element {
  const { t } = useTranslation(NS.Landing, {
    keyPrefix: 'PRIVACY_POLICY.DATA_USAGE',
  });
  return (
    <Section title={t('TITLE')}>
      <SubSection title={t('ACCOUNT.TITLE')}>
        <Typography>{t('ACCOUNT.TEXT')}</Typography>
      </SubSection>
      <SubSection title={t('PROVIDE_SERVICES.TITLE')}>
        <Typography>{t('PROVIDE_SERVICES.TEXT')}</Typography>
      </SubSection>
      <SubSection title={t('ANALYZE_USAGE.TITLE')}>
        <Typography>{t('ANALYZE_USAGE.TEXT')}</Typography>
      </SubSection>
      <SubSection title={t('COMPLIANCE.TITLE')}>
        <Typography>{t('COMPLIANCE.TEXT')}</Typography>
      </SubSection>
      <SubSection title={t('RESEARCH.TITLE')}>
        <Typography>{t('RESEARCH.TEXT')}</Typography>
      </SubSection>
    </Section>
  );
}

function DataCollection(): JSX.Element {
  const { t } = useTranslation(NS.Landing, {
    keyPrefix: 'PRIVACY_POLICY.DATA_COLLECTION',
  });
  return (
    <Section title={t('TITLE')}>
      <SubSection title={t('ACCOUNT.TITLE')}>
        <ListedParagraph text={t('ACCOUNT.TEXT')}>
          <ListItem>{t('ACCOUNT.DATA_1')}</ListItem>
          <ListItem>{t('ACCOUNT.DATA_2')}</ListItem>
          <ListItem>{t('ACCOUNT.DATA_3')}</ListItem>
          <ListItem>{t('ACCOUNT.DATA_4')}</ListItem>
          <ListItem>{t('ACCOUNT.DATA_5')}</ListItem>
          <ListItem>{t('ACCOUNT.DATA_6')}</ListItem>
          <ListItem>{t('ACCOUNT.DATA_7')}</ListItem>
        </ListedParagraph>
      </SubSection>
      <SubSection title={t('METADATA.TITLE')}>
        <Typography>{t('METADATA.TEXT')}</Typography>
      </SubSection>
      <SubSection title={t('OPERATIONAL_DATA.TITLE')}>
        <ListedParagraph text={t('OPERATIONAL_DATA.TEXT')}>
          <ListItem>{t('OPERATIONAL_DATA.DATA_1')}</ListItem>
          <ListItem>{t('OPERATIONAL_DATA.DATA_2')}</ListItem>
          <ListItem>{t('OPERATIONAL_DATA.DATA_3')}</ListItem>
          <ListItem>{t('OPERATIONAL_DATA.DATA_4')}</ListItem>
          <ListItem>{t('OPERATIONAL_DATA.DATA_5')}</ListItem>
          <ListItem>{t('OPERATIONAL_DATA.DATA_6')}</ListItem>
          <ListItem>{t('OPERATIONAL_DATA.DATA_7')}</ListItem>
        </ListedParagraph>
      </SubSection>
      <SubSection title={t('UPLOADED_DATA.TITLE')}>
        <Typography>{t('UPLOADED_DATA.TEXT')}</Typography>
      </SubSection>
    </Section>
  );
}

function Cookies(): JSX.Element {
  const { t } = useTranslation(NS.Landing, {
    keyPrefix: 'PRIVACY_POLICY.COOKIES',
  });
  return (
    <Section title={t('TITLE')}>
      <Paragraphs>
        <Typography>{t('DEFINITION')}</Typography>
        <ListedParagraph text={t('PURPOSE.TEXT')}>
          <ListItem>{t('PURPOSE.PURPOSE_1')}</ListItem>
          <ListItem>{t('PURPOSE.PURPOSE_2')}</ListItem>
          <ListItem>{t('PURPOSE.PURPOSE_3')}</ListItem>
          <ListItem>{t('PURPOSE.PURPOSE_4')}</ListItem>
        </ListedParagraph>
        <ListedParagraph text={t('MANAGEMENT.TEXT')}>
          <ListItem>
            <MuiLink href="https://support.microsoft.com/en-us/microsoft-edge/view-cookies-in-microsoft-edge-a7d95376-f2cd-8e4a-25dc-1de753474879">
              {t('MANAGEMENT.EDGE')}
            </MuiLink>
          </ListItem>
          <ListItem>
            <MuiLink href="https://support.apple.com/en-us/guide/safari/sfri11471/mac">
              {t('MANAGEMENT.SAFARI')}
            </MuiLink>
          </ListItem>
          <ListItem>
            <MuiLink href="https://support.google.com/chrome/answer/95647">
              {t('MANAGEMENT.CHROME')}
            </MuiLink>
          </ListItem>
          <ListItem>
            <MuiLink href="https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox">
              {t('MANAGEMENT.FIREFOX')}
            </MuiLink>
          </ListItem>
        </ListedParagraph>
        <ListedParagraph text={t('FINALITY.TEXT')}>
          <ListItem>{t('FINALITY.NECESSARY')}</ListItem>
          <ListItem>{t('FINALITY.FUNCTIONAL')}</ListItem>
          <ListItem>{t('FINALITY.ADVERTISING')}</ListItem>
        </ListedParagraph>
      </Paragraphs>
    </Section>
  );
}

function DataRetention(): JSX.Element {
  const { t } = useTranslation(NS.Landing, {
    keyPrefix: 'PRIVACY_POLICY.DATA_RETENTION',
  });
  return (
    <Section title={t('TITLE')}>
      <Paragraphs>
        <Typography>{t('TEXT')}</Typography>
        <Typography>{t('STORAGE_LOCATION')}</Typography>
      </Paragraphs>
    </Section>
  );
}

function DataSharing(): JSX.Element {
  const { t } = useTranslation(NS.Landing, {
    keyPrefix: 'PRIVACY_POLICY.DATA_SHARING',
  });
  return (
    <Section title={t('TITLE')}>
      <Paragraphs>
        <ListedParagraph text={t('TEXT')}>
          <ListItem>{t('SHARE_1')}</ListItem>
          <ListItem>{t('SHARE_2')}</ListItem>
        </ListedParagraph>
      </Paragraphs>
    </Section>
  );
}

function ServiceProviders(): JSX.Element {
  const { t } = useTranslation(NS.Landing, {
    keyPrefix: 'PRIVACY_POLICY.SERVICE_PROVIDERS',
  });
  return (
    <Section title={t('TITLE')}>
      <SubSection title={t('AWS.TITLE')}>
        <Typography>{t('AWS.TEXT')}</Typography>
        <MuiLink href="https://aws.amazon.com/privacy/">
          {t('AWS.PRIVACY_POLICY_LINK')}
        </MuiLink>
      </SubSection>
      <SubSection title={t('OTHER_PROVIDERS.TITLE')}>
        <Typography>{t('OTHER_PROVIDERS.GOOGLE_ANALYTICS')}</Typography>
        <Typography>{t('OTHER_PROVIDERS.SENTRY')}</Typography>
        <Typography>{t('OTHER_PROVIDERS.GOOGLE_FONTS')}</Typography>
      </SubSection>
      <SubSection title={t('TRANSFERS.TITLE')}>
        <Typography>{t('TRANSFERS.TEXT')}</Typography>
      </SubSection>
    </Section>
  );
}

function Security(): JSX.Element {
  const { t } = useTranslation(NS.Landing, {
    keyPrefix: 'PRIVACY_POLICY.SECURITY',
  });
  return (
    <Section title={t('TITLE')}>
      <Paragraphs>
        <Typography>{t('TEXT')}</Typography>
      </Paragraphs>
    </Section>
  );
}

function YourRights(): JSX.Element {
  const { t } = useTranslation(NS.Landing, {
    keyPrefix: 'PRIVACY_POLICY.YOUR_RIGHTS',
  });
  return (
    <Section title={t('TITLE')}>
      <Paragraphs>
        <Typography>{t('TEXT')}</Typography>
        <ListedParagraph text={t('RIGHTS.TEXT')}>
          <ListItem>{t('RIGHTS.RIGHT_1')}</ListItem>
          <ListItem>{t('RIGHTS.RIGHT_2')}</ListItem>
          <ListItem>{t('RIGHTS.RIGHT_3')}</ListItem>
          <ListItem>{t('RIGHTS.RIGHT_4')}</ListItem>
          <ListItem>{t('RIGHTS.RIGHT_5')}</ListItem>
          <ListItem>{t('RIGHTS.RIGHT_6')}</ListItem>
        </ListedParagraph>
        <Typography>{t('RESERVATION')}</Typography>
      </Paragraphs>
    </Section>
  );
}

function PolicyChanges(): JSX.Element {
  const { t } = useTranslation(NS.Landing, {
    keyPrefix: 'PRIVACY_POLICY.POLICY_CHANGES',
  });
  return (
    <Section title={t('TITLE')}>
      <Paragraphs>
        <Typography>{t('TEXT')}</Typography>
      </Paragraphs>
    </Section>
  );
}

function FinalProvisions(): JSX.Element {
  const { t } = useTranslation(NS.Landing, {
    keyPrefix: 'PRIVACY_POLICY.FINAL_PROVISIONS',
  });
  return (
    <Section title={t('TITLE')}>
      <SubSection title={t('APPLICABLE_LAW.TITLE')}>
        <Typography>{t('APPLICABLE_LAW.TEXT')}</Typography>
      </SubSection>
    </Section>
  );
}
