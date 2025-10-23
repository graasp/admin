import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { ActionTriggers } from '@graasp/sdk';

import { NS } from '@/config/constants';

const RADIAN = Math.PI / 180;

type Props = {
  cx: number;
  cy: number;
  innerRadius: number;
  outerRadius: number;
  midAngle: number;
  percent: number;
  fill: string;
  type: `${ActionTriggers}`;
};

const ActionChartLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  fill,
  type,
}: Props): JSX.Element => {
  const { t } = useTranslation(NS.Enums);

  const radius = innerRadius + (outerRadius - innerRadius) * 1.15;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill={fill} fontSize={14} textAnchor={'middle'}>
      <tspan>{t(type)}</tspan>
      <tspan x={x} y={y + 15}>{`${(percent * 100).toFixed(0)}%`}</tspan>
    </text>
  );
};

export default ActionChartLabel;
