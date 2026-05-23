import { useTabbarStore } from '@packages/stores';

export function useRefresh() {
  const tabbarStore = useTabbarStore();

  async function refresh() {
    await tabbarStore.refresh();
  }

  return {
    refresh,
  };
}
