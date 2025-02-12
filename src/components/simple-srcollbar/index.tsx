import ClassNames from 'classnames';
import React from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

const SimpleScrollbar = ({
  children,
  className,
}: {
  readonly children: React.ReactNode;
  readonly className?: string;
}) => {
  return (
    // <div className={ClassNames('h-full flex-1 overflow-hidden', className)}>
    <SimpleBar className={ClassNames(className)}>{children}</SimpleBar>
    // </div>
  );
};

export default SimpleScrollbar;
