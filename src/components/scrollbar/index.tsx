import { forwardRef, memo } from 'react';
import SimpleBar, { type Props as SimpleBarProps } from 'simplebar-react';

const Scrollbar = memo(
  forwardRef<HTMLElement, SimpleBarProps>(({ children, ...other }, ref) => {
    return (
      <SimpleBar
        className="h-full"
        scrollableNodeProps={{ ref }}
        clickOnTrack={false}
        {...other}
      >
        {children}
      </SimpleBar>
    );
  })
);

export default Scrollbar;
