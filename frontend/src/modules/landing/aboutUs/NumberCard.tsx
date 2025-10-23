import { Card, Typography } from '@mui/material';

function NumberCard({
  number,
  title,
}: Readonly<{ number: string; title: string }>) {
  return (
    <Card
      sx={{
        width: '100%',
        display: 'block',
        background: '#f7eefe',
        borderRadius: 5,
        p: 2,
        textAlign: 'center',
      }}
    >
      <Typography variant="h2" component="p">
        {number}
      </Typography>
      <Typography variant="h6" component="p">
        {title}
      </Typography>
    </Card>
  );
}

export default NumberCard;
