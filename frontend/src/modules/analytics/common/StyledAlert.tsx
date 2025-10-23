import { Alert, styled } from '@mui/material';

const StyledAlert = styled(Alert)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  margin: theme.spacing(2),
  marginTop: theme.spacing(1),
}));

export default StyledAlert;
