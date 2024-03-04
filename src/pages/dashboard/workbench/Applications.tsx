import { useThemeToken } from '@/theme/hooks';
import Basic from './components/Basic';

export default function Applications() {
  const { colorInfoActive, colorInfoBorder } = useThemeToken();
  return (
    <Basic
      percent={75}
      title="45,566"
      subtitle="Applications"
      iconify="ic:round-email"
      bg={colorInfoActive}
      strokeColor={colorInfoBorder}
    />
  );
}
