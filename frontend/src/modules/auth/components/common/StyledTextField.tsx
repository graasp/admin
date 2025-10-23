import { TextField, styled } from '@mui/material';

const FORM_INPUT_MIN_WIDTH = 300;

export const StyledTextField = styled(TextField)(() => ({
  minWidth: FORM_INPUT_MIN_WIDTH,
}));
