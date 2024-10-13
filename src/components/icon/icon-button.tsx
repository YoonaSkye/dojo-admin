import { PropsWithChildren } from 'react';
import { Button } from '@/components/ui/button';

export default function IconButton({ children }: PropsWithChildren) {
  return (
    <Button
      variant="icon"
      size="icon"
      className="rounded-full outline-none flex items-center gap-1"
    >
      {children}
    </Button>
  );
}
