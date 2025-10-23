import { type JSX, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { SelectProps } from '@mui/material';

import {
  PermissionLevel,
  PermissionLevelCompare,
  PermissionLevelOptions,
} from '@graasp/sdk';

import { NS } from '@/config/constants';
import {
  ITEM_MEMBERSHIP_PERMISSION_SELECT_CLASS,
  buildPermissionOptionId,
} from '@/config/selectors';
import Select from '@/ui/Select/Select';

import { BUILDER } from '../../../langs';

/**
 * Type of the `disabled` prop which allows to disable a subset of the options.
 * Undefined keys are considered as not disabled.
 */
type DisabledMap = {
  [key in PermissionLevelOptions]?: boolean;
};

const defaultDisabledMap: DisabledMap = {
  admin: false,
  read: false,
  write: false,
};

export type ItemMembershipSelectProps = {
  value?: PermissionLevelOptions;
  onChange?: SelectProps['onChange'];
  color?: SelectProps['color'];
  showLabel?: boolean;
  displayEmpty?: boolean;
  /**
   * This prop allows to disable the select when passed the value `true`
   * or to disable only certain options when passed an object where the keys are the values of the options
   */
  disabled?: boolean | DisabledMap;
  allowDowngrade?: boolean;
  size?: SelectProps['size'];
};

const ItemMembershipSelect = ({
  value,
  onChange,
  color,
  showLabel = true,
  displayEmpty = false,
  disabled = false,
  allowDowngrade = true,
  size = 'small',
}: ItemMembershipSelectProps): JSX.Element => {
  const { t: translateBuilder } = useTranslation(NS.Builder);
  const { t: enumT } = useTranslation(NS.Enums);
  const [permission, setPermission] = useState(value);
  const label = showLabel
    ? translateBuilder(BUILDER.ITEM_MEMBERSHIP_PERMISSION_LABEL)
    : undefined;
  const disabledMap =
    typeof disabled === 'boolean' ? defaultDisabledMap : disabled;
  useEffect(() => {
    if (permission !== value) {
      // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
      setPermission(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const values = Object.values(PermissionLevel).filter((p) =>
    value ? allowDowngrade || PermissionLevelCompare.gte(p, value) : true,
  );

  return (
    <Select
      label={label}
      values={values.map((v) => ({
        value: v,
        text: enumT(v),
        disabled: disabledMap[v],
      }))}
      disabled={typeof disabled === 'boolean' ? disabled : undefined}
      buildOptionId={buildPermissionOptionId}
      value={permission}
      defaultValue={permission}
      onChange={onChange}
      displayEmpty={displayEmpty}
      className={ITEM_MEMBERSHIP_PERMISSION_SELECT_CLASS}
      color={color}
      size={size}
    />
  );
};

export default ItemMembershipSelect;
