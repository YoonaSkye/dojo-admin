import type { StateCreator } from 'zustand';
import { create as actualCreate } from 'zustand';

const storeResetFns = new Set<() => void>();

const resetAllStores = () => {
  storeResetFns.forEach((resetFn) => {
    resetFn();
  });
};

const create = (<T extends { reset: () => void }>() => {
  return (stateCreator: StateCreator<T>) => {
    const store = actualCreate(stateCreator);
    storeResetFns.add(() => {
      // store.setState(store.getInitialState(), true);
      store.getState().reset();
    });
    return store;
  };
}) as typeof actualCreate;

export { resetAllStores, create };
