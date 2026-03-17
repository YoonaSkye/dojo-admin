import { Card, Input, Space } from 'antd';
import { useState } from 'react';

import Page from '@/components/page';
import { IconPicker } from '@/features/icon-picker';
import {
  MdiKeyboardEsc,
  SvgAvatar1Icon,
  SvgAvatar2Icon,
  SvgAvatar3Icon,
  SvgAvatar4Icon,
  SvgBellIcon,
  SvgCakeIcon,
  SvgCardIcon,
  SvgDownloadIcon,
  SvgGithubIcon,
  SvgGoogleIcon,
  SvgQQChatIcon,
  SvgWeChatIcon,
} from '@/icons';

export default function ButtonControl() {
  const [currentSelect, setCurrentSelect] = useState<string>(
    'mdi-light:book-multiple',
  );
  return (
    <Page
      title="图标"
      descriptionNode={
        <div className="mt-2 text-foreground/80">
          图标可在
          <a
            className="text-primary"
            href="https://icon-sets.iconify.design/"
            target="_blank"
          >
            &nbsp;Iconify&nbsp;
          </a>
          中查找，支持多种图标库，如 Material Design, Font Awesome, Jam Icons
          等。
        </div>
      }
    >
      <Card className="mb-5" title="Iconify">
        <div className="flex items-center gap-5">
          <SvgGithubIcon className="size-8" />
          <SvgGoogleIcon className="size-8" />
          <SvgQQChatIcon className="size-8" />
          <SvgWeChatIcon className="size-8" />
          <MdiKeyboardEsc className="size-8" />
        </div>
      </Card>

      <Card className="mb-5" title="Svg Icons">
        <div className="flex items-center gap-5">
          <SvgAvatar1Icon className="size-8" />
          <SvgAvatar2Icon className="size-8 text-red-500" />
          <SvgAvatar3Icon className="size-8 text-green-500" />
          <SvgAvatar4Icon className="size-8" />
          <SvgCakeIcon className="size-8" />
          <SvgBellIcon className="size-8" />
          <SvgCardIcon className="size-8" />
          <SvgDownloadIcon className="size-8" />
        </div>
      </Card>

      <Card title="图标选择器">
        <div className="mb-5 flex items-center gap-5">
          <span>原始样式(Iconify):</span>
          <IconPicker
            value="ant-design:trademark-outlined"
            // className="w-[200px]"
          />
        </div>

        <div className="mb-5 flex items-center gap-5">
          <span>原始样式(svg):</span>
          <IconPicker value="svg:avatar-1" className="w-[200px]" prefix="svg" />
        </div>

        <div className="mb-5 flex items-center gap-5">
          <span>自定义 Input:</span>
          <IconPicker
            inputComponent={<Input />}
            value="mdi:alien-outline"
            iconSlot="addonAfter"
            modelValueProp="value"
            prefix="mdi"
          />
        </div>

        <div className="flex items-center gap-5">
          <span>显示为一个Icon:</span>
          <Space.Compact>
            <Input
              value={currentSelect}
              onChange={(e) => setCurrentSelect(e.target.value)}
              allowClear
              placeholder="点击这里选择图标"
              style={{ width: 300 }}
            />
            <Space.Addon>
              <IconPicker
                value={currentSelect}
                onChange={(icon) => setCurrentSelect(icon)}
                prefix="mdi-light"
                type="icon"
              />
            </Space.Addon>
          </Space.Compact>
        </div>
      </Card>
    </Page>
  );
}
