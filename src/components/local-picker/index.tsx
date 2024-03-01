import { Dropdown, MenuProps } from 'antd';
import { IconButton, SvgIcon } from '../icon';
import useLocale, { LANGUAGE_MAP } from '@/locales/useLocale';
import { LocalEnum } from '#/enum';
type Locale = keyof typeof LocalEnum;

export default function LocalPicker() {
  const { locale, setLocale } = useLocale();
  console.log(locale);

  const localeList: MenuProps['items'] = Object.values(LANGUAGE_MAP).map(
    (item) => {
      return {
        key: item.locale,
        label: item.label,
        icon: <SvgIcon icon={item.icon} size="20" className="rounded-md" />,
      };
    }
  );
  return (
    <Dropdown
      placement="bottomRight"
      trigger={['click']}
      key={locale}
      menu={{ items: localeList, onClick: (e) => setLocale(e.key) }}
    >
      <IconButton className="h-10 w-10 hover:scale-105">
        <SvgIcon
          icon={`ic-locale_${locale}`}
          size="24"
          className="rounded-md"
        />
      </IconButton>
    </Dropdown>
  );
}
