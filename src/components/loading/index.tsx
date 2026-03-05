import { Spin } from 'antd';
import NProgress from 'nprogress';
import { useEffect } from 'react';

import 'nprogress/nprogress.css';

export default function Loading() {
  useEffect(() => {
    NProgress.start();

    return () => {
      NProgress.done();
    };
  }, []);
  return (
    <div className="flex h-full items-center justify-center">
      <Spin size="large" />
    </div>
  );
}
