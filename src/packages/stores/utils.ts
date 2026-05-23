import { create as actualCreate } from 'zustand';

import type { StateCreator } from 'zustand';

const storeResetFns = new Set<() => void>();
const storePersistObjects = new Set<{ persist: { clearStorage: () => void } }>();

const registerStore = (store: { persist: { clearStorage: () => void } }) => {
  storePersistObjects.add(store);
};

const resetAllStores = () => {
  storeResetFns.forEach((resetFn) => {
    resetFn();
  });
};

const clearAllStoresPersistence = () => {
  storePersistObjects.forEach((store) => {
    store.persist.clearStorage();
  });
};

const create = (<T extends { reset: () => void }>() => {
  return (stateCreator: StateCreator<T>) => {
    const store = actualCreate(stateCreator);
    storeResetFns.add(() => {
      store.getState().reset();
    });
    if ('persist' in store) {
      registerStore(store as any);
    }
    return store;
  };
}) as typeof actualCreate;

export { resetAllStores, clearAllStoresPersistence, create };
