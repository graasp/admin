import { type JSX, type ReactNode, forwardRef } from 'react';

import { Box, LinkProps, Link as MUILink, Stack, styled } from '@mui/material';

import { LinkComponent, createLink } from '@tanstack/react-router';
import { ExternalLinkIcon } from 'lucide-react';

const StyledLink = styled(MUILink)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  padding: theme.spacing(1, 2),
  backgroundColor: 'transparent',
  transition: 'all linear 100ms',
  color: 'inherit',
  '&:hover': {
    backgroundColor: 'rgb(0,0,0, 20%)',
  },
}));

type ExternalLinkProps = {
  href: string;
  children: ReactNode;
};

export function ExternalLink({
  href,
  children,
}: Readonly<ExternalLinkProps>): JSX.Element {
  return (
    <StyledLink href={href}>
      <Stack direction="row" display="inline" gap={1} alignItems="center">
        <span>{children}</span>
        <Box
          // to make the icon flow with the text it should be "inline"
          display="inline"
          sx={{
            // adjust the vertical alignment so the icon appears aligned with the text
            // default is baseline which does not look good
            verticalAlign: 'top',
          }}
          // allow some spacing between the icon and the text
          marginInlineStart={1}
        >
          <ExternalLinkIcon size={20} />
        </Box>
      </Stack>
    </StyledLink>
  );
}

type SocialLinkProps = {
  href: string;
  children: ReactNode;
  icon: ReactNode;
};
export function SocialLink({
  icon,
  children,
  href,
}: Readonly<SocialLinkProps>): JSX.Element {
  return (
    <StyledLink href={href}>
      <Stack direction="row" gap={2}>
        {icon}
        {children}
      </Stack>
    </StyledLink>
  );
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface MUILinkProps extends Omit<LinkProps, 'href'> {
  // Add any additional props you want to pass to the button
}

const MUILinkComponent = forwardRef<HTMLAnchorElement, MUILinkProps>(
  (props, ref) => {
    return <StyledLink component={'a'} ref={ref} {...props} />;
  },
);

const CreatedLinkComponent = createLink(MUILinkComponent);

export const InternalLink: LinkComponent<typeof MUILinkComponent> = (props) => {
  return <CreatedLinkComponent preload="intent" resetScroll {...props} />;
};
