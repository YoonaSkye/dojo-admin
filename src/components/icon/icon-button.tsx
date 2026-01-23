import { Button, type ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';
import { type ButtonVariants } from './type';

interface Props extends ButtonProps {
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  variant?: ButtonVariants;
}

const IconButton = forwardRef<HTMLButtonElement, Props>(
  (
    { children, className, variant = 'icon', onClick, ...props }: Props,
    ref,
  ) => {
    return (
      <Button
        variant={variant}
        size="icon"
        className={cn('rounded-full', className)}
        onClick={onClick}
        ref={ref}
        {...props}
      >
        {children}
      </Button>
    );
  },
);

IconButton.displayName = 'IconButton';

export default IconButton;
