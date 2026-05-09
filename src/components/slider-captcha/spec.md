# SliderCaptcha 滑块验证码组件规范 (React 版本)

## 1. 概述

**组件名称**: SliderCaptcha  
 **功能**: 用户通过拖动滑块完成验证的前端组件
**技术栈**: React 18 + TypeScript + TailwindCSS
**支持平台**: PC (mouse) + 移动端 (touch)

---

## 2. 组件结构

SliderCaptcha/
├── index.tsx # 主组件，核心逻辑
├── SliderCaptchaAction.tsx # 可拖动滑块手柄
├── SliderCaptchaBar.tsx # 进度条
├── SliderCaptchaContent.tsx # 文本内容
└── types.ts # 类型定义

---

## 3. 类型定义 (types.ts)

```typescript
export interface SliderCaptchaProps {
  className?: string;
  actionStyle?: React.CSSProperties;
  barStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  wrapperStyle?: React.CSSProperties;
  isSlot?: boolean;
  successText?: string;
  text?: string;
  onSuccess?: (data: CaptchaVerifyPassingData) => void;
  onStart?: (e: MouseEvent | TouchEvent) => void;
  onMove?: (data: SliderRotateVerifyPassingData) => void;
  onEnd?: (e: MouseEvent | TouchEvent) => void;
}

export interface CaptchaVerifyPassingData {
  isPassing: boolean;
  time: number | string;
}

export interface SliderRotateVerifyPassingData {
  event: MouseEvent | TouchEvent;
  moveDistance: number;
  moveX: number;
}

export interface SliderCaptchaActionType {
  resume: () => void;
}

---
4. 主组件接口 (SliderCaptcha)

Props

┌──────────────┬─────────────────────┬────────┬──────────────────┐
│     属性     │        类型         │ 默认值 │       说明       │
├──────────────┼─────────────────────┼────────┼──────────────────┤
│ className    │ string              │ -      │ 自定义类名       │
├──────────────┼─────────────────────┼────────┼──────────────────┤
│ actionStyle  │ React.CSSProperties │ {}     │ 滑块手柄样式     │
├──────────────┼─────────────────────┼────────┼──────────────────┤
│ barStyle     │ React.CSSProperties │ {}     │ 进度条样式       │
├──────────────┼─────────────────────┼────────┼──────────────────┤
│ contentStyle │ React.CSSProperties │ {}     │ 内容区样式       │
├──────────────┼─────────────────────┼────────┼──────────────────┤
│ wrapperStyle │ React.CSSProperties │ {}     │ 容器样式         │
├──────────────┼─────────────────────┼────────┼──────────────────┤
│ isSlot       │ boolean             │ false  │ 是否作为插槽模式 │
├──────────────┼─────────────────────┼────────┼──────────────────┤
│ successText  │ string              │ -      │ 验证成功文字     │
├──────────────┼─────────────────────┼────────┼──────────────────┤
│ text         │ string              │ -      │ 初始提示文字     │
└──────────────┴─────────────────────┴────────┴──────────────────┘

Events

┌───────────┬────────────────────────────────┬──────────┐
│   事件    │              参数              │   说明   │
├───────────┼────────────────────────────────┼──────────┤
│ onSuccess │ { isPassing, time }            │ 验证成功 │
├───────────┼────────────────────────────────┼──────────┤
│ onStart   │ MouseEvent | TouchEvent        │ 拖动开始 │
├───────────┼────────────────────────────────┼──────────┤
│ onMove    │ { event, moveDistance, moveX } │ 拖动中   │
├───────────┼────────────────────────────────┼──────────┤
│ onEnd     │ MouseEvent | TouchEvent        │ 拖动结束 │
└───────────┴────────────────────────────────┴──────────┘

Ref 方法

通过 ref 可以调用:

interface SliderCaptchaRef {
  resume: () => void;
}

使用示例

const captchaRef = useRef<SliderCaptchaRef>(null);

<SliderCaptcha
  ref={captchaRef}
  onSuccess={(data) => console.log(data)}
/>

// 重置
captchaRef.current?.resume();

---
5. 子组件接口

5.1 SliderCaptchaAction

Props:
- actionStyle: React.CSSProperties
- isPassing: boolean
- toLeft: boolean
- onMouseDown: (e: MouseEvent) => void
- onTouchStart: (e: TouchEvent) => void
- children?: React.ReactNode (插槽，图标)

Expose 方法 (通过 ref):
- getEl(): HTMLDivElement
- getStyle(): CSSStyleDeclaration
- setLeft(val: string): void

5.2 SliderCaptchaBar

Props:
- barStyle: React.CSSProperties
- toLeft: boolean

Expose 方法:
- getEl(): HTMLDivElement
- setWidth(val: string): void

5.3 SliderCaptchaContent

Props:
- contentStyle: React.CSSProperties
- isPassing: boolean
- successText: string
- text: string
- children?: React.ReactNode (插槽，文本)

Expose 方法:
- getEl(): HTMLDivElement

---
6. 核心状态

interface State {
  endTime: number;
  isMoving: boolean;
  isPassing: boolean;
  moveDistance: number;
  startTime: number;
  toLeft: boolean;
}

const [state, setState] = useState<State>({
  endTime: 0,
  isMoving: false,
  isPassing: false,
  moveDistance: 0,
  startTime: 0,
  toLeft: false,
});

// v-model 等效: 使用单独的 isPassing 状态 + onSuccess回调更新
const [isPassing, setIsPassing] = useState(false);

---
7. 核心算法

7.1 拖动距离计算

const getEventPageX = (e: MouseEvent | TouchEvent): number => {
  if ('pageX' in e) return e.pageX;
  if ('touches' in e && e.touches[0]) return e.touches[0].pageX;
  return 0;
};

const moveX = getEventPageX(e) - moveDistance;

7.2 最大偏移量计算

const getOffset = (actionEl?: HTMLDivElement | null) => {
  const wrapperWidth = wrapperRef.current?.offsetWidth ?? 220;
  const actionWidth = actionEl?.offsetWidth ?? 40;
  const offset = wrapperWidth - actionWidth - 6;
  return { actionWidth, offset, wrapperWidth };
};

7.3 边界处理

┌────────────────────┬──────────┐
│        条件        │   行为   │
├────────────────────┼──────────┤
│ moveX <= 0         │ 不处理   │
├────────────────────┼──────────┤
│ 0 < moveX < offset │ 正常拖动 │
├────────────────────┼──────────┤
│ moveX >= offset    │ 触发验证 │
└────────────────────┴──────────┘

---
8. 交互流程

用户点击滑块
    ↓
handleDragStart(e)
    ├── 记录 moveDistance
    ├── 记录 startTime
    └── 设置 isMoving = true

用户拖动滑块
    ↓
handleDragMoving(e)
    ├── 计算 moveX
    ├── 触发 onMove
    ├── 更新滑块位置
    ├── 更新进度条宽度
    └── 超过阈值时触发 checkPass()

用户释放滑块
    ↓
handleDragOver(e)
    ├── 触发 onEnd
    ├── 未达阈值: 调用 resume()
    └── 达到阈值: 调用 checkPass()

---
9. 事件处理 (React 写法)

// 拖动开始 - 绑定在 SliderCaptchaAction 上
const handleDragStart = useCallback((e: MouseEvent | TouchEvent) => {
  if (state.isPassing) return;
  // ...
}, []);

// 拖动中 - 绑定在 wrapper 上
const handleDragMoving = useCallback((e: MouseEvent | TouchEvent) => {
  if (!state.isMoving) return;
  // ...
}, [state.isMoving, state.moveDistance]);

// 拖动结束
const handleDragOver = useCallback((e: MouseEvent | TouchEvent) => {
  if (!state.isMoving || state.isPassing) return;
  // ...
}, [state.isMoving, state.isPassing, state.moveDistance]);

---
10. 子组件实现模式

10.1 forwardRef + useImperativeHandle

// SliderCaptchaAction.tsx
interface ActionRef {
  getEl: () => HTMLDivElement;
  getStyle: () => CSSStyleDeclaration;
  setLeft: (val: string) => void;
}

const SliderCaptchaAction = forwardRef<ActionRef, ActionProps>(
  ({ actionStyle, isPassing, toLeft, onMouseDown, onTouchStart,
children }, ref) => {
    const actionRef = useRef<HTMLDivElement>(null);
    const [left, setLeft] = useState('0');

    useImperativeHandle(ref, () => ({
      getEl: () => actionRef.current!,
      getStyle: () => actionRef.current!.style,
      setLeft: (val: string) => setLeft(val),
    }));

    return (
      <div
        ref={actionRef}
        style={{ ...actionStyle, left }}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
      >
        {children || <DefaultIcon isPassing={isPassing} />}
      </div>
    );
  }
);

10.2 插槽模式 (children render)

// 父组件
<SliderCaptchaAction>
  {(isPassing) => isPassing ? <CheckIcon /> : <DragIcon />}
</SliderCaptchaAction>

// 子组件
{typeof children === 'function' ? children(isPassing) : children}

---
11. JSX 结构

return (
  <div
    ref={wrapperRef}
    className={cn(
      'relative flex h-10 w-full items-center overflow-hidden
rounded-md border border-border bg-background-deep text-center',
      className,
    )}
    style={wrapperStyle}
    onMouseLeave={handleDragOver}
    onMouseMove={handleDragMoving}
    onMouseUp={handleDragOver}
    onTouchEnd={handleDragOver}
    onTouchMove={handleDragMoving}
  >
    <SliderCaptchaBar ref={barRef} barStyle={barStyle} toLeft={toLeft}
/>
    <SliderCaptchaContent
      ref={contentRef}
      contentStyle={contentStyle}
      isPassing={isPassing}
      successText={successText || t('ui.captcha.sliderSuccessText')}
      text={text || t('ui.captcha.sliderDefaultText')}
    >
      {slots.text && { isPassing: state.isPassing }}
    </SliderCaptchaContent>
    <SliderCaptchaAction
      ref={actionRef}
      actionStyle={actionStyle}
      isPassing={isPassing}
      toLeft={toLeft}
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
    >
      {slots.actionIcon?.({ isPassing: state.isPassing })}
    </SliderCaptchaAction>
  </div>
);

---
12. 重置动画 (resume)

const resume = useCallback(() => {
  setState(prev => ({ ...prev, isMoving: false, isPassing: false, ...
}));

  const contentNode = contentRef.current?.getEl();
  if (contentNode) contentNode.style.width = '100%';

  setToLeft(true);

  setTimeout(() => {
    setToLeft(false);
    actionRef.current?.setLeft('0');
    barRef.current?.setWidth('0');
  }, 300);
}, []);

---
13. 样式规范 (与 Vue 版本一致)

// 容器
className="relative flex h-10 w-full items-center overflow-hidden
rounded-md border border-border bg-background-deep text-center"

// 滑块
className="absolute top-0 left-0 flex-center h-full cursor-move
bg-background px-3.5 shadow-md dark:bg-accent"

// 进度条
className="absolute h-full bg-success"

// 内容区
className="absolute top-0 flex-center size-full text-xs select-none"

---
14. 使用示例

import { useRef } from 'react';
import { SliderCaptcha, type SliderCaptchaRef } from './';

function Demo() {
  const captchaRef = useRef<SliderCaptchaRef>(null);

  const handleSuccess = (data: { isPassing: boolean; time: string }) =>
 {
    console.log('验证成功，耗时:', data.time);
  };

  return (
    <div>
      <SliderCaptcha
        ref={captchaRef}
        onSuccess={handleSuccess}
        text="拖动以进行校验"
        successText="校验成功"
        actionStyle={{ backgroundColor: '#018ffb' }}
      />
      <button onClick={() => captchaRef.current?.resume()}>
        还原
      </button>
    </div>
  );
}

```

---

## 17. 功能验证指标

### 17.1 核心功能验证清单

#### F1: 拖动开始

| 测试项              | 预期行为                                     | 验证方式       |
| ------------------- | -------------------------------------------- | -------------- |
| 首次点击滑块        | `onStart` 事件触发，`isMoving` 状态为 `true` | 检查事件参数   |
| 点击已通过的滑块    | 无反应，不触发拖动                           | 再次点击应无效 |
| 计算 `moveDistance` | `moveDistance = pageX - 滑块left`            | 打点验证数值   |

#### F2: 拖动中移动

| 测试项       | 预期行为                        | 验证方式   |
| ------------ | ------------------------------- | ---------- |
| 正常拖动     | 滑块跟随鼠标，`onMove` 持续触发 | 事件频率   |
| 滑块位置同步 | `setLeft(moveX)` 正确更新 DOM   | 视觉验证   |
| 进度条同步   | 宽度 = `moveX + actionWidth/2`  | 尺寸测量   |
| 拖出左边界   | `moveX <= 0` 时滑块不动         | 拖到最左端 |
| 拖到最右端   | 超过 `offset` 后滑块卡在终点    | 拖到最右   |

#### F3: 拖动结束 - 未通过验证

| 测试项                 | 预期行为               | 验证方式     |
| ---------------------- | ---------------------- | ------------ |
| 释放时未达阈值         | `resume()` 被调用      | 检查重置动画 |
| 重置动画 `toLeft=true` | 内容区宽度变为 100%    | 动画触发     |
| 300ms 后重置           | 滑块回到 0，进度条归零 | 时间验证     |
| `isMoving` 重置        | 变为 `false`           | 状态检查     |
| `isPassing` 保持       | 仍为 `false`           | 状态检查     |

#### F4: 拖动结束 - 通过验证

| 测试项           | 预期行为                           | 验证方式 |
| ---------------- | ---------------------------------- | -------- |
| 释放时超过阈值   | `onSuccess` 触发                   | 事件触发 |
| 返回数据格式     | `{ isPassing: true, time: "1.5" }` | 数据验证 |
| `isPassing` 状态 | 变为 `true`                        | 状态检查 |
| modelValue 更新  | v-model 绑定值为 `true`            | 双向绑定 |

#### F5: 重置功能 (resume)

| 测试项          | 预期行为                             | 验证方式 |
| --------------- | ------------------------------------ | -------- |
| ref 调用 resume | 组件重置到初始状态                   | API 测试 |
| 所有状态归零    | moveDistance, startTime, endTime = 0 | 状态验证 |
| 滑块位置归零    | left = '0'                           | DOM 验证 |
| 进度条宽度归零  | width = '0'                          | DOM 验证 |
| 内容区宽度恢复  | width = '100%'                       | DOM 验证 |

#### F6: 事件兼容性

| 测试项             | 预期行为                   | 验证方式     |
| ------------------ | -------------------------- | ------------ |
| 桌面端 mouse 事件  | 正常拖动                   | mouse 操作   |
| 移动端 touch 事件  | 正常拖动                   | touch 操作   |
| getEventPageX 兼容 | Mouse/Touch 返回正确 pageX | 两种设备测试 |

---

### 17.2 Props 功能验证

| 测试项                | 操作                               | 预期结果       |
| --------------------- | ---------------------------------- | -------------- |
| `actionStyle` 自定义  | 传入 `{ backgroundColor: 'red' }`  | 滑块背景变红   |
| `barStyle` 自定义     | 传入 `{ backgroundColor: 'blue' }` | 进度条变蓝     |
| `wrapperStyle` 自定义 | 传入 `{ height: '60px' }`          | 容器高度变化   |
| `isSlot=true`         | 拖动到终点不自动验证               | 等待外部触发   |
| `successText` 自定义  | 验证通过后显示                     | 显示自定义文字 |
| `text` 自定义         | 初始状态显示                       | 显示自定义文字 |

---

### 17.3 插槽功能验证

#### #actionIcon 插槽

```tsx
// 验证项
<SliderCaptcha>
  <template #actionIcon="{ isPassing }">
    {isPassing ? <Check /> : <ChevronsRight />}
  </template>
</SliderCaptcha>

| 状态 | 预期显示 |
|------|----------|
| 未通过时 | ChevronRight 图标 |
| 通过后 | Check 图标 |

#text 插槽

// 验证项
<SliderCaptcha>
  <template #text="{ isPassing }">
    {isPassing ? '成功' : '拖动'}
  </template>
</SliderCaptcha>

| 状态 | 预期显示 |
|------|----------|
| 未通过时 | "拖动" 文字 |
| 通过后 | "成功" 文字 |

---
17.4 边界条件测试

┌──────┬────────────────────────┬──────────────────────────┬──────────────┐
│ 编号 │          场景          │         预期结果         │   通过标准   │
├──────┼────────────────────────┼──────────────────────────┼──────────────┤
│ B1   │ 快速拖动（< 1秒完成）  │ 仍能正常触发 success     │ 时间计算正确 │
├──────┼────────────────────────┼──────────────────────────┼──────────────┤
│ B2   │ 慢速拖动（> 10秒）     │ 仍能正常触发 success     │ 无超时问题   │
├──────┼────────────────────────┼──────────────────────────┼──────────────┤
│ C1   │ 连续触发多次拖动       │ 状态正确管理             │ 无状态混乱   │
├──────┼────────────────────────┼──────────────────────────┼──────────────┤
│ C2   │ 通过后再次拖动         │ 无反应（isPassing=true） │ 防重复触发   │
├──────┼────────────────────────┼──────────────────────────┼──────────────┤
│ C3   │ resume 后立即拖动      │ 正常工作                 │ 重置彻底     │
├──────┼────────────────────────┼──────────────────────────┼──────────────┤
│ D1   │ 窗口 resize 过程中拖动 │ 边界计算正确             │ 无 DOM 错位  │
├──────┼────────────────────────┼──────────────────────────┼──────────────┤
│ D2   │ 快速释放（点击不拖动） │ 正确触发 resume          │ 边界处理正确 │
└──────┴────────────────────────┴──────────────────────────┴──────────────┘

---
17.5 视觉样式验证

┌──────────────┬───────────────────────────────┐
│    检查点    │             标准              │
├──────────────┼───────────────────────────────┤
│ 容器高度     │ 40px (h-10)                   │
├──────────────┼───────────────────────────────┤
│ 容器圆角     │ rounded-md                    │
├──────────────┼───────────────────────────────┤
│ 容器边框     │ border border-border          │
├──────────────┼───────────────────────────────┤
│ 滑块定位     │ absolute, 左侧 0 位置         │
├──────────────┼───────────────────────────────┤
│ 滑块高度     │ h-full, 与容器同高            │
├──────────────┼───────────────────────────────┤
│ 滑块光标     │ cursor-move                   │
├──────────────┼───────────────────────────────┤
│ 进度条颜色   │ bg-success (绿色)             │
├──────────────┼───────────────────────────────┤
│ 进度条位置   │ absolute, 左对齐              │
├──────────────┼───────────────────────────────┤
│ 内容居中     │ flex-center, text-xs          │
├──────────────┼───────────────────────────────┤
│ 拖动中圆角   │ rounded-md (超过 10px 时)     │
├──────────────┼───────────────────────────────┤
│ 成功文字颜色 │ 白色 (webkit-text-fill-color) │
└──────────────┴───────────────────────────────┘

---
17.6 验收标准 (Acceptance Criteria)

必须通过 (P0):

- F1-1: 点击滑块触发 onStart
- F2-1: 拖动时滑块跟随移动
- F2-5: 拖动到终点触发验证
- F3-1: 未达终点释放后重置
- F4-1: 到达终点释放后 success
- F5-1: resume() 方法正常工作
- F6-1: 桌面端 mouse 正常
- F6-2: 移动端 touch 正常

应该通过 (P1):

- Props 样式自定义有效
- #actionIcon 插槽有效
- #text 插槽有效
- 国际化文本正确显示

最好通过 (P2):

- B1-B2: 快速/慢速拖动正常
- C2-C3: 通过后防重复，重置彻底
- D2: 快速释放正确处理

---
17.7 自动化测试用例模板

describe('SliderCaptcha', () => {
  describe('F1: 拖动开始', () => {
    it('F1-1: 点击滑块应触发 onStart', async () => {
      const onStart = vi.fn();
      render(<SliderCaptcha onStart={onStart} />);

      const action = screen.getByRole('button', { name: /drag/i });
      await userEvent.click(action);

      expect(onStart).toHaveBeenCalledTimes(1);
    });
  });

  describe('F2: 拖动中', () => {
    it('F2-1: 拖动时滑块位置同步更新', async () => {
      render(<SliderCaptcha />);
      // ... drag simulation
      // expect position updated
    });
  });

  describe('F3: 未通过验证重置', () => {
    it('F3-1: 释放时未达阈值应触发 resume', async () => {
      const onSuccess = vi.fn();
      render(<SliderCaptcha onSuccess={onSuccess} />);
      // ... drag partially and release
      expect(onSuccess).not.toHaveBeenCalled();
    });
  });

  describe('F4: 通过验证', () => {
    it('F4-1: 拖动到终点应触发 onSuccess', async () => {
      const onSuccess = vi.fn();
      render(<SliderCaptcha onSuccess={onSuccess} />);
      // ... drag to end
      expect(onSuccess).toHaveBeenCalledWith(
        expect.objectContaining({ isPassing: true, time: expect.any(String) })
      );
    });
  });

  describe('F5: resume', () => {
    it('F5-1: resume() 应重置组件', async () => {
      const ref = createRef<SliderCaptchaRef>();
      render(<SliderCaptcha ref={ref} />);

      // trigger success first
      // ...

      ref.current.resume();

      // verify all state reset
    });
  });
});

---
17.8 手动测试检查清单

□ 基础拖动验证
  □ 鼠标点击滑块开始
  □ 拖动到中间位置
  □ 释放，确认重置

□ 完整拖动验证
  □ 鼠标点击滑块开始
  □ 拖动到最右侧
  □ 释放，确认 success 触发

□ 重置按钮验证
  □ 验证成功后点击重置
  □ 组件恢复初始状态
  □ 可再次进行验证

□ 移动端验证
  □ 使用手机/平板触摸
  □ 触摸滑块开始
  □ 拖动到终点
  □ 释放，确认成功

□ 样式自定义验证
  □ 修改滑块颜色
  □ 修改进度条颜色
  □ 修改容器尺寸
  □ 确认样式生效

□ 插槽验证
  □ 使用自定义图标
  □ 使用自定义文本
  □ 确认状态切换正确

---
17.9 性能指标 (可选)

┌──────────────┬────────┬─────────────────┐
│     指标     │  标准  │      说明       │
├──────────────┼────────┼─────────────────┤
│ 首次渲染     │ < 16ms │ 一帧内完成      │
├──────────────┼────────┼─────────────────┤
│ 拖动响应     │ < 16ms │ 流畅无卡顿      │
├──────────────┼────────┼─────────────────┤
│ 事件触发延迟 │ < 5ms  │ 及时响应        │
├──────────────┼────────┼─────────────────┤
│ 内存占用     │ 无泄漏 │ 连续使用 100 次 │
└──────────────┴────────┴─────────────────┘

---
18. 调试技巧

18.1 开发时输出状态

// React 版本添加调试日志
useEffect(() => {
  console.log('[SliderCaptcha] state:', state);
}, [state]);

18.2 常见问题排查

┌──────────────┬──────────────────────────────────────────┐
│     问题     │                 排查方向                 │
├──────────────┼──────────────────────────────────────────┤
│ 滑块不跟随   │ 检查 setLeft 是否生效，left 状态是否更新 │
├──────────────┼──────────────────────────────────────────┤
│ 进度条不显示 │ 检查 setWidth 和 barStyle                │
├──────────────┼──────────────────────────────────────────┤
│ 事件不触发   │ 检查 onMouseDown 是否正确绑定            │
├──────────────┼──────────────────────────────────────────┤
│ 重置不生效   │ 检查 resume 时序和 toLeft 状态           │
├──────────────┼──────────────────────────────────────────┤
│ 位置计算错误 │ 检查 getOffset 返回值                    │
└──────────────┴──────────────────────────────────────────┘
```
