import { IconButton } from '@/components/icon';
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
import { Copy, RotateCw, Settings, X } from '@/icons';
import { CSSProperties } from 'react';
import {
  Block,
  BreadCrumb,
  Builtin,
  Footer,
  Header,
  Layout,
  Radius,
  Sidebar,
  SwitchItem,
  Theme,
} from './blocks';

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

export default function Preferences() {
  const tabsStyle: CSSProperties = {
    gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))`,
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <IconButton>
          <Settings className="size-4" />
        </IconButton>
      </SheetTrigger>
      <SheetContent className="z-[1000] flex w-[520px] flex-col sm:max-w-sm">
        <SheetHeader className="!flex flex-row items-center justify-between border-b px-4 py-3">
          <div>
            <SheetTitle className="text-left text-base font-medium">
              偏好设置
            </SheetTitle>
            <SheetDescription className="mt-1 text-xs">
              自定义偏好设置 & 实时预览
            </SheetDescription>
          </div>
          <div className="flex-center">
            <div className="flex items-center">
              <IconButton className="relative">
                <span className="absolute right-0.5 top-0.5 h-2 w-2 rounded bg-primary"></span>
                <RotateCw className="size-4" />
              </IconButton>
            </div>
            <IconButton>
              <X className="size-4" />
            </IconButton>
          </div>
        </SheetHeader>
        <div className="relative flex-1 overflow-y-auto p-3">
          <Tabs defaultValue="appearance" className="">
            <TabsList
              style={tabsStyle}
              className="relative grid w-full bg-accent"
            >
              {tabs.map((tab) => (
                <TabsTrigger value={tab.value} key={tab.label}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="appearance" key="appearance">
              <Block title="主题">
                <Theme />
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
