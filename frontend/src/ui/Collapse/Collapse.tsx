import { type JSX, type ReactNode, useState } from 'react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  SxProps,
  Typography,
  styled,
} from '@mui/material';

import { ChevronDown } from 'lucide-react';

const COLLAPSE_MIN_HEIGHT = 56;

export type CollapseProps = {
  children?: ReactNode;
  title: string;
  sx?: SxProps;
  onCollapse?: (c: boolean) => void;
};

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  '.MuiAccordionSummary-root': {
    marginBottom: -1,
    minHeight: COLLAPSE_MIN_HEIGHT,
    flexDirection: 'row-reverse',
    '&$expanded': {
      minHeight: COLLAPSE_MIN_HEIGHT,
    },
    '& .MuiIconButton-edgeEnd': {
      marginRight: theme.spacing(0.5),
      marginLeft: theme.spacing(0.5),
    },
  },
  '.Mui-expanded': {},
}));

const Collapse = ({
  title,
  sx,
  children,
  onCollapse,
}: CollapseProps): JSX.Element => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleChange = (isExpanded: boolean) => () => {
    setExpanded(!isExpanded);
    onCollapse?.(!isExpanded);
  };

  return (
    <Accordion
      square
      elevation={0}
      disableGutters
      sx={[
        {
          outline: '1px solid rgba(0, 0, 0, .125)',
          boxShadow: 'none',
          borderRadius: 2,
        },
        {
          '&:not(:last-child)': {
            borderBottom: 0,
          },
        },
        {
          '&:before': {
            display: 'none',
          },
        },
        // You cannot spread `sx` directly because `SxProps` (typeof sx) might not be an array.
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      expanded={expanded}
      onChange={handleChange(expanded)}
    >
      <StyledAccordionSummary expandIcon={<ChevronDown />}>
        <Typography>{title}</Typography>
      </StyledAccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default Collapse;
