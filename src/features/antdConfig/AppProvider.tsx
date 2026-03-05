import { App } from 'antd';
import { useEffect } from 'react';

import { antdUtils } from '@/utils';

function ContextHolder() {
  const { message, modal, notification } = App.useApp();

  useEffect(() => {
    antdUtils.setMessageInstance(message);
    antdUtils.setNotificationInstance(notification);
    antdUtils.setModalInstance(modal);
  }, [notification, message, modal]);

  return null;
}

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <App className="h-full">
      <ContextHolder />
      {children}
    </App>
  );
};

export default AppProvider;
