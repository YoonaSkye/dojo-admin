import { Button } from '@/components/ui/button';
import { Bell } from '@/icons';

function Notification() {
  return (
    <Button variant="icon" size="icon" className="relative mr-1 rounded-full">
      <span className="absolute right-0.5 top-0.5 h-2 w-2 rounded bg-primary"></span>
      <Bell className="size-4" />
    </Button>
  );
}

export default Notification;
