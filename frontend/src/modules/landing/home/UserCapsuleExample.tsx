import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';

type Props = {
  url: string;
  imageSrc: string;
  title: string;
};

export function UserCapsuleExample({ url, imageSrc, title }: Props) {
  return (
    <Card sx={{ borderRadius: 6, width: '100%', height: '100%' }}>
      <CardActionArea
        LinkComponent={'a'}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={title}
        href={url}
        sx={{ width: '100%', height: '100%' }}
      >
        <CardMedia
          component="img"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            aspectRatio: '1/1',
          }}
          src={imageSrc}
          alt={title}
        />
      </CardActionArea>
    </Card>
  );
}
