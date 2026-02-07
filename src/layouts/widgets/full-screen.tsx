import { Button } from '@/components/ui/button';
import { Maximize, Minimize } from '@/icons';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import screenfull from 'screenfull';

interface Props {
  className?: string;
}

export default function FullScreenButton({ className }: Props) {
  const [isFullscreen, setIsFullscreen] = useState(screenfull.isFullscreen);
  const toggleFullScreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle();
      setIsFullscreen(!isFullscreen);
    }
  };
  return (
    <Button
      variant="icon"
      size="icon"
      className={cn('rounded-full', className)}
      onClick={toggleFullScreen}
    >
      {isFullscreen ? (
        <Minimize className="size-4 text-foreground" />
      ) : (
        <Maximize className="size-4 text-foreground" />
      )}
    </Button>
  );
}
