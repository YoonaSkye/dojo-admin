import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Settings, RotateCw, X, Copy } from '@/icons';

export default function Preference() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="icon" size="icon" className="rounded-full mr-2">
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
              <Button variant="icon" size="icon" className="relative">
                <span className="bg-primary absolute right-0.5 top-0.5 h-2 w-2 rounded"></span>
                <RotateCw className="size-4" />
              </Button>
            </div>
            <Button variant="icon" size="icon" className="rounded-full">
              <X className="size-4" />
            </Button>
          </div>
        </SheetHeader>
        <div className="relative flex-1 overflow-y-auto p-3"></div>
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
