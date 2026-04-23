import { useTabbarStore } from '@/store/tabs';

export function useRefresh() {
  const tabbarStore = useTabbarStore();

  async function refresh() {
    await tabbarStore.refresh();
  }

  return {
    refresh,
  };
}
