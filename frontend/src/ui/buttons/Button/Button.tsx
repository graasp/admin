import {
  type AnchorHTMLAttributes,
  type ElementType,
  type JSX,
  type ReactNode,
} from 'react';

import { Button, ButtonProps } from '@mui/material';

export type GraaspButtonProps = {
  autoFocus?: boolean;
  /**
   * button contents, usually a string
   */
  children?: ReactNode;
  /**
   * className string
   */
  className?: string;
  color?: ButtonProps['color'];
  component?: ElementType;
  /**
   * cypress data-cy attribute
   */
  dataCy?: string;
  disabled?: boolean;
  endIcon?: ReactNode;
  fullWidth?: boolean;
  /**
   * id string
   */
  id?: string;
  /**
   * on click handler
   */
  onClick?: () => void;
  size?: ButtonProps['size'];
  startIcon?: ReactNode;
  type?: ButtonProps['type'];
  variant?: ButtonProps['variant'];

  role?: ButtonProps['role'];
} & Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'target'>;

export const GraaspButton = ({
  autoFocus,
  children,
  className,
  color = 'primary',
  dataCy,
  disabled = false,
  endIcon,
  fullWidth,
  id,
  onClick,
  size = 'medium',
  startIcon,
  type,
  variant = 'contained',
  href,
  role,
  ...other
}: GraaspButtonProps): JSX.Element => (
  <Button
    role={role}
    // eslint-disable-next-line jsx-a11y/no-autofocus
    autoFocus={autoFocus}
    className={className}
    color={color}
    data-cy={dataCy}
    disabled={disabled}
    endIcon={endIcon}
    fullWidth={fullWidth}
    id={id}
    onClick={onClick}
    size={size}
    startIcon={startIcon}
    type={type}
    variant={variant}
    href={href}
    title={href}
    {...other}
  >
    {children}
  </Button>
);

export default GraaspButton;
