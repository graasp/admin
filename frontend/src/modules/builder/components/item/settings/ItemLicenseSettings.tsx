import { type JSX, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CreativeCommons as CCLicenseIcon } from 'lucide-react';

import { NS } from '@/config/constants';
import CreativeCommons from '@/ui/CreativeCommons/CreativeCommons';
import Button from '@/ui/buttons/Button/Button';
import { CCSharingVariant } from '@/ui/types';

import { CC_LICENSE_ABOUT_URL } from '~builder/constants';
import { useOutletContext } from '~builder/contexts/OutletContext';
import { BUILDER } from '~builder/langs';
import { convertLicense } from '~builder/utils/itemLicense';

import ItemSettingProperty from './ItemSettingProperty';
import UpdateLicenseDialog from './UpdateLicenseDialog';

const ItemLicenseSettings = (): JSX.Element | null => {
  const { t: translateBuilder } = useTranslation(NS.Builder);
  const [licenseDialogOpen, setLicenseDialogOpen] = useState(false);

  const { item } = useOutletContext();

  const { allowSharing, allowCommercialUse, requireAccreditation } = useMemo(
    () => convertLicense(item?.settings.ccLicenseAdaption ?? ''),
    [item?.settings.ccLicenseAdaption],
  );

  if (item) {
    return (
      <>
        <ItemSettingProperty
          title={translateBuilder(BUILDER.ITEM_SETTINGS_CC_LICENSE_TITLE)}
          icon={<CCLicenseIcon />}
          inputSetting={
            <Button
              variant="outlined"
              onClick={() => setLicenseDialogOpen(true)}
            >
              {translateBuilder(BUILDER.UPDATE_LICENSE)}
            </Button>
          }
          valueText={
            <a href={CC_LICENSE_ABOUT_URL}>
              {translateBuilder(
                BUILDER.ITEM_SETTINGS_CC_LICENSE_MORE_INFORMATIONS,
              )}
            </a>
          }
          additionalInfo={
            item?.settings?.ccLicenseAdaption ? (
              <CreativeCommons
                sx={{
                  border: '1px solid #bbb',
                  borderRadius: 2,
                  backgroundColor: 'white',
                }}
                requireAccreditation={requireAccreditation}
                allowSharedAdaptation={allowSharing as CCSharingVariant}
                allowCommercialUse={allowCommercialUse}
                iconSize={30}
              />
            ) : undefined
          }
        />
        <UpdateLicenseDialog
          open={licenseDialogOpen}
          setOpen={setLicenseDialogOpen}
          item={item}
        />
      </>
    );
  }
  return null;
};

export default ItemLicenseSettings;
