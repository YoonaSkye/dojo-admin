import { RouterProvider as Provider } from 'react-router-dom';
import { RouterContext } from './router-context';
import { router } from '../router';

export const RouterProvider = () => {
  return (
    <RouterContext.Provider value={router}>
      <Provider router={router.reactRouter} />
    </RouterContext.Provider>
  );
};
