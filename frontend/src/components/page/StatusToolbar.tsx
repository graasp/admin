import {
  Avatar,
  AvatarGroup,
  CircularProgress,
  Skeleton,
  Stack,
} from '@mui/material';

export function StatusToolbar({
  users,
  isConnected,
}: {
  users: { name: string }[];
  isConnected: boolean;
}) {
  if (!isConnected) {
    return (
      <Stack
        justifyContent="space-between"
        alignContent="center"
        direction="row"
      >
        <Stack>
          <CircularProgress size={30} />
        </Stack>
        <AvatarGroup sx={{ gap: 1 }}>
          <Skeleton>
            <Avatar />
          </Skeleton>
          <Skeleton>
            <Avatar />
          </Skeleton>
          <Skeleton>
            <Avatar />
          </Skeleton>
        </AvatarGroup>
      </Stack>
    );
  }

  return (
    <Stack justifyContent="space-between" alignContent="center" direction="row">
      <Stack>{!isConnected && <CircularProgress size={30} />}</Stack>
      <AvatarGroup>
        {users.map((user) => (
          <Avatar>{user.name[0].toUpperCase()}</Avatar>
        ))}
      </AvatarGroup>
    </Stack>
  );
}
