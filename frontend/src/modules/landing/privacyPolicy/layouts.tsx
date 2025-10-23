import { type JSX, type ReactNode } from 'react';

import { Stack, Typography } from '@mui/material';

export function Page({
  title,
  children,
}: Readonly<{ title: string; children: ReactNode }>) {
  return (
    <Stack direction="column" maxWidth="md" gap={8} mt={8}>
      <Typography variant="h1" color="primary">
        {title}
      </Typography>
      <Stack component="ol" gap={10} sx={{ textAlign: 'justify' }}>
        {children}
      </Stack>
    </Stack>
  );
}

function SectionTitle({
  children,
}: Readonly<{
  children: ReactNode;
}>): JSX.Element {
  return (
    <Typography component="li" variant="h2" color="primary">
      {children}
    </Typography>
  );
}

export function Section({
  children,
  title,
}: Readonly<{
  children: ReactNode;
  title: ReactNode;
}>): JSX.Element {
  return (
    <Stack gap={2}>
      <SectionTitle>{title}</SectionTitle>
      <Stack component="ol" sx={{ paddingInlineStart: 0 }} gap={4}>
        {children}
      </Stack>
    </Stack>
  );
}

export function ListItem({
  children,
}: Readonly<{ children: ReactNode }>): JSX.Element {
  return <Typography component="li">{children}</Typography>;
}

export function Paragraphs({
  children,
}: Readonly<{ children: ReactNode }>): JSX.Element {
  return (
    <Stack direction="column" gap={2}>
      {children}
    </Stack>
  );
}

export function SubSection({
  children,
  title,
}: Readonly<{
  children: ReactNode;
  title: string;
}>): JSX.Element {
  return (
    <Paragraphs>
      <Typography variant="h5" component="li">
        {title}
      </Typography>
      {children}
    </Paragraphs>
  );
}

export function EnumeratedParagraph({
  children,
  text,
}: Readonly<{
  children: ReactNode;
  text: ReactNode;
}>): JSX.Element {
  return (
    <Stack gap={1}>
      <Typography>{text}</Typography>
      <Stack
        component="ol"
        gap={1}
        sx={{
          paddingInlineStart: '20px',
          '& li': {
            listPosition: 'outside',
          },
        }}
      >
        {children}
      </Stack>
    </Stack>
  );
}

export function ListedParagraph({
  children,
  text,
}: Readonly<{
  children: ReactNode;
  text?: ReactNode;
}>): JSX.Element {
  return (
    <Stack gap={1}>
      {text && <Typography>{text}</Typography>}
      <Stack
        component="ul"
        sx={{
          paddingInlineStart: '20px',
          listStyleType: 'disc',
          '& li': {
            listPosition: 'outside',
          },
        }}
      >
        {children}
      </Stack>
    </Stack>
  );
}
