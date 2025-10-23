import { ChangeEventHandler, type JSX } from 'react';

import { Button, styled } from '@mui/material';

import { CloudUploadIcon } from 'lucide-react';

import { GraaspButtonProps } from '@/ui/buttons/Button/Button.js';

export type UploadFileButtonProps = {
  id?: string;
  /**
   * callback when files are selected
   */
  onChange: ChangeEventHandler<HTMLInputElement>;
  /**
   * whether files are uploading
   */
  isLoading?: boolean;
  /**
   * text when loading
   */
  loadingText?: string;
  /**
   * text when changes have been detected
   */
  text?: string;

  /**
   * accept prop for browse button
   */
  accept?: string;
  /**
   * whether multiple files can be selected
   */
  multiple?: boolean;
  /**
   * button icon
   */
  icon?: JSX.Element | null;
} & Pick<GraaspButtonProps, 'size' | 'color' | 'variant'>;

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const UploadFileButton = ({
  id,
  isLoading = false,
  onChange,
  loadingText = 'Uploading...',
  text = 'Upload a file',
  variant = 'contained',
  accept,
  multiple,
  icon = <CloudUploadIcon />,
  size,
  color,
}: UploadFileButtonProps): JSX.Element => (
  <Button
    id={id}
    component="label"
    variant={variant}
    color={color}
    startIcon={icon}
    loading={isLoading}
    disabled={isLoading}
    size={size}
  >
    {isLoading ? loadingText : text}
    <VisuallyHiddenInput
      multiple={multiple}
      onChange={onChange}
      type="file"
      accept={accept}
    />
  </Button>
);

export default UploadFileButton;
