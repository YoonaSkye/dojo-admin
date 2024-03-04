import { useThemeToken } from '@/theme/hooks';
import Basic from './components/Basic';

export default function Conversion() {
  const { colorPrimaryActive, colorPrimaryBorder } = useThemeToken();
  return (
    <Basic
      percent={48}
      title="38,566"
      subtitle="Conversion"
      iconify="tabler:user-filled"
      bg={colorPrimaryActive}
      strokeColor={colorPrimaryBorder}
    />
  );
}
