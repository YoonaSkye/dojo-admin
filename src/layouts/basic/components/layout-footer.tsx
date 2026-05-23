import { useFooterSetting } from '@packages/stores';

function LayoutFooter() {
  const { enable: footerVisible } = useFooterSetting();

  if (!footerVisible) return null;
  return <footer>Footer</footer>;
}

export default LayoutFooter;
