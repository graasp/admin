import {
  Avatar,
  Card,
  CardContent,
  Stack,
  Typography,
  styled,
} from '@mui/material';

const QUOTE_START_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 24 24' fill='lightsteelblue' stroke='none' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' transform='rotate(180)' %3E%3Cpath d='M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z'/%3E%3Cpath d='M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z'/%3E%3C/svg%3E")`;
const QUOTE_END_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 24 24' fill='lightsteelblue' stroke='none' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' %3E%3Cpath d='M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z'/%3E%3Cpath d='M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z'/%3E%3C/svg%3E")`;
const StyledTypography = styled(Typography)({
  '&::before': {
    content: QUOTE_START_SVG,
    paddingInlineEnd: '10px',
  },
  '&::after': {
    content: QUOTE_END_SVG,
    paddingInlineStart: '10px',
    verticalAlign: 'text-top',
  },
});
type TestimonyCardProps = {
  name: string;
  title?: string;
  text: string;
  image: string;
};
export function TestimonyCard({
  name,
  title,
  text,
  image,
}: Readonly<TestimonyCardProps>) {
  return (
    <Card
      sx={{
        // minWidth: '200px',
        maxWidth: '250px',
        height: 'fit-content',
      }}
    >
      <CardContent>
        <Stack direction="column" gap={2} alignItems="center">
          <Avatar sx={{ width: '60px', height: '60px' }} src={image} />
          <Stack alignItems="center" textAlign="center">
            <Typography color="primary" variant="h5">
              {name}
            </Typography>
            <Typography variant="note" color="text.secondary">
              {title}
            </Typography>
          </Stack>
          <StyledTypography textAlign="justify">{text}</StyledTypography>
        </Stack>
      </CardContent>
    </Card>
  );
}
