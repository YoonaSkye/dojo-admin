import { useEffect, useState, useRef, useCallback } from 'react';
import { useScroll } from 'framer-motion';
import Header from './Header';
import Main from './Main';
import Nav from './Nav';
import { useThemeToken } from '@/theme/hooks';

export default function DashboardLayout() {
  const { colorBgElevated, colorTextBase } = useThemeToken();
  const [offsetTop, setOffsetTop] = useState(false);
  const mainRef = useRef(null);
  const { scrollY } = useScroll({
    container: mainRef,
  });
  const onOffsetTop = useCallback(() => {
    scrollY.on('change', (scrollHeight) => {
      if (scrollHeight > 0) {
        setOffsetTop(true);
      } else {
        setOffsetTop(false);
      }
    });
  }, [scrollY]);

  useEffect(() => {
    onOffsetTop();
  }, [onOffsetTop]);

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: colorBgElevated, color: colorTextBase }}
    >
      {/* layout 采用两栏布局 */}
      {/* header 采用绝对布局 */}
      <Header offsetTop={offsetTop} />
      {/* nav */}
      <Nav />
      {/* main content */}
      {/* DashboardLayout */}
      <Main ref={mainRef} />
    </div>
  );
}
