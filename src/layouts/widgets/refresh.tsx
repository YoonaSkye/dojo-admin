import { IconButton } from '@/components/icon';
import { useRefresh } from '@/hooks/use-refresh';
import { RotateCw } from '@/icons';

export default function RefreshButton() {
  const { refresh } = useRefresh();

  return (
    <IconButton className="my-0 mr-1 rounded-md" onClick={refresh}>
      <RotateCw className="size-4" />
    </IconButton>
  );
}
