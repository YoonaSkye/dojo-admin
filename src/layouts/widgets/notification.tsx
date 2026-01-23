import { Button } from '@/components/ui/button';
import { Bell } from '@/icons';

function Notification() {
  return (
    <Button variant="icon" size="icon" className="rounded-full mr-1 relative">
      <span className="bg-primary absolute right-0.5 top-0.5 h-2 w-2 rounded"></span>
      <Bell className="size-4" />
    </Button>
  );
}

export default Notification;
