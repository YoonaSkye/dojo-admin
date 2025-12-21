import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { ThemeModeSegmented } from '@/features/theme';
import { Copy, RotateCw, Settings, X } from '@/icons';
import { CSSProperties } from 'react';
import Block from './blocks/block';
import BreadCrumb from './blocks/layout/breadcrumb';
import Footer from './blocks/layout/footer';
import Header from './blocks/layout/header';
import Layout from './blocks/layout/layout';
import Sidebar from './blocks/layout/sidebar';
import SwitchItem from './blocks/switch-item';
import Builtin from './blocks/theme/builtin';
import Radius from './blocks/theme/radius';

const tabs = [
  {
    label: '外观',
    value: 'appearance',
  },
  {
    label: '布局',
    value: 'layout',
  },
  {
    label: '快捷键',
    value: 'shortcutKey',
  },
];

export default function Preference() {
  const tabsStyle: CSSProperties = {
    gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))`,
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="icon" size="icon" className="rounded-full">
          <Settings className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="z-[1000] flex flex-col w-[520px] sm:max-w-sm">
        <SheetHeader className="!flex flex-row items-center justify-between border-b px-4 py-3">
          <div>
            <SheetTitle className="text-left text-base font-medium">
              偏好设置
            </SheetTitle>
            <SheetDescription className="mt-1 text-xs">
              自定义偏好设置 & 实时预览
            </SheetDescription>
          </div>
          <div className="flex-center ">
            <div className="flex items-center">
              <Button
                variant="icon"
                size="icon"
                className="rounded-full relative"
              >
                <span className="bg-primary absolute right-0.5 top-0.5 h-2 w-2 rounded"></span>
                <RotateCw className="size-4" />
              </Button>
            </div>
            <Button variant="icon" size="icon" className="rounded-full">
              <X className="size-4" />
            </Button>
          </div>
        </SheetHeader>
        <div className="relative flex-1 overflow-y-auto p-3">
          <Tabs defaultValue="appearance" className="">
            <TabsList
              style={tabsStyle}
              className="bg-accent relative grid w-full"
            >
              {tabs.map((tab) => (
                <TabsTrigger value={tab.value} key={tab.label}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="appearance" key="appearance">
              <Block title="主题">
                <ThemeModeSegmented />
              </Block>
              <Block title="内置主题">
                <Builtin />
              </Block>
              <Block title="圆角">
                <Radius />
              </Block>
              <Block title="其他">
                <SwitchItem title="色弱模式" />
                <SwitchItem title="灰色模式" />
              </Block>
            </TabsContent>
            <TabsContent value="layout" key="layout">
              <Block title="布局">
                <Layout />
              </Block>
              <Block title="侧边栏">
                <Sidebar />
              </Block>
              <Block title="顶栏">
                <Header />
              </Block>
              <Block title="面包屑导航">
                <BreadCrumb />
              </Block>
              <Block title="底栏">
                <Footer />
              </Block>
            </TabsContent>
            <TabsContent value="shortcutKey" key="shortcutKey">
              <Block title="全局">
                <SwitchItem title="快捷键" />
                <SwitchItem title="全局搜索" shortcut="⌘ K" />
                <SwitchItem title="退出登录" shortcut="⌥ Q" />
                <SwitchItem title="锁定屏幕" shortcut="⌥ L" />
              </Block>
            </TabsContent>
          </Tabs>
        </div>
        <SheetFooter className="w-full flex-row items-center justify-end border-t p-2 px-3">
          <Button variant="default" size="sm" className="mx-4 w-full">
            <Copy className="mr-2 size-3" />
            复制偏好设置
          </Button>
          <Button variant="ghost" size="sm" className="mx-4 w-full">
            清空缓存 & 退出登录
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
