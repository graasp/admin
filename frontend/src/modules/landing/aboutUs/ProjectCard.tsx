import { Card, Stack, Typography } from '@mui/material';

export function ProjectCard({
  description,
  title,
  src,
  width,
}: Readonly<{
  description: string;
  title: string;
  src: string;
  width?: string | number;
}>) {
  return (
    <Card
      sx={{
        width: '100%',
        display: 'block',
        background: '#f7eefe',
        borderRadius: 5,
        p: 4,
        textAlign: 'center',
        height: '100%',
      }}
    >
      <Stack justifyContent="center" alignItems="center" height="100%" gap={2}>
        <img src={src} alt={title} width={width} />
        <Stack>
          <Typography variant="h5" component="p">
            {title}
          </Typography>
          <Typography variant="body1" component="p">
            {description}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
