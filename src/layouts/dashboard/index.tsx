import { useEffect, useState, useRef, useCallback, Suspense } from 'react';
import { useScroll } from 'framer-motion';
import Header from './Header';
import Main from './Main';
import Nav from './Nav';
import NavHorizontal from './nav-horizontal';
import { useThemeToken } from '@/theme/hooks';
import { useSettings } from '@/store/settingStore';
import { ThemeLayout } from '#/enum';
import { Spin } from 'antd';

export default function DashboardLayout() {
  const { colorBgElevated, colorTextBase } = useThemeToken();
  const { themeLayout } = useSettings();

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

  const verticalLayout = (
    <>
      <Header />
      <div className="z-50 hidden h-full shadow flex-shrink-0 md:block">
        <Nav />
      </div>
      <Main ref={mainRef} />
    </>
  );

  const horizontalLayout = (
    <div className="relative flex flex-1 flex-col">
      <Header />
      <NavHorizontal />
      <Main ref={mainRef} />
    </div>
  );

  const layout =
    themeLayout !== ThemeLayout.Horizontal ? verticalLayout : horizontalLayout;

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: colorBgElevated, color: colorTextBase }}
    >
      <Suspense fallback={<Spin />}>{layout}</Suspense>
    </div>
  );
}
