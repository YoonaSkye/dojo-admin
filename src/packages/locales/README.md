# 🌐 Internationalization (i18n) Module 说明文档

本项目基于 `i18next` 与 `react-i18next` 构建了一套**高性能、按需异步并行加载**的国际化（i18n）解决方案。设计上融合了经典开源架构（如 Vben Admin）的动态扫描特性，兼顾了首屏体积优化与多场景调用的灵活性。

---

## 🚀 核心特性

- **按需异步并行加载**：首屏仅加载默认语言包，切换语言时通过 `Promise.all` 并发请求对应的 JSON 片段，极致优化打包体积与网络耗时。
- **自动化目录扫描**：利用 Vite 的 `import.meta.glob` 自动扫描 `langs` 目录，支持将多 JSON 文件无缝聚合成以文件名（Namespace）为 Key 的对象。
- **全场景安全调用**：
  - **组件内**：提供响应式 Hook，语言切换时 UI 状态及第三方组件库自动刷新。
  - **组件外**：提供动态代理函数 `$t`，在 Axios 拦截器、路由守卫、纯工具函数等非 React 环境下调用绝不失效。
- **标准语义兼容**：全自动兼容下划线与中划线目录规范（如 `zh_CN` 自动映射为标准 `zh-CN`），自带未匹配 Key 的控制台警告提示。

---

## 📂 目录结构规范

语言包放置在 `src/locales/langs` 目录下。推荐使用**标准中划线**命名文件夹。支持将翻译根据业务拆分为多个 JSON 模块，系统会自动将其聚合成以文件名（Namespace）为 Key 的对象。

```text

```

---

## 🔌 核心 API 快速上手

### 1. 纯 JS 环境 / 组件外使用 (`$t`, `setLocale`)

在非 React 组件环境（如：Axios 拦截器、纯工具函数、静态配置文件、路由钩子）中，**严禁使用 Hook**，请直接导入并使用以下全局方法：

```typescript
import { $t, setLocale } from '@/locales';

// ✅ 正确示例：在异步事件或函数体内部动态调用
function handleAuthError() {
  toast.error($t('common.unauthorized'));
}

// ✅ 正确示例：非组件环境切换系统语言（支持异步等待）
async function changeLanguageToEnglish() {
  await setLocale('en-US');
}
```

### 2. React 组件内使用 (`useLocale`, `LANGUAGE_MAP`)

在 React 组件内部，请使用封装好的自定义 Hook。它集成了 React 的响应式副作用，能确保系统语言切换时，当前组件及第三方组件库（如 Ant Design / Shadcn）同步响应并渲染新语言。

```tsx
import { useLocale, LANGUAGE_MAP } from '@/locales/useLocale';

export default function LanguageSelector() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="flex items-center space-x-2">
      <p>当前语言: {LANGUAGE_MAP[locale].label}</p>
      <button onClick={() => setLocale('en-US')}>Switch to English</button>
    </div>
  );
}
```

---

## 🛠️ 初始化配置集成

### 入口阻塞挂载 (`src/main.tsx`)

为防止首屏加载时由于网络延迟出现“多语言骨架 Key（如 `menu.home`）”闪烁的现象，系统在根树渲染前实施了**强阻塞初始化**：

```tsx
import { setupI18n } from '@/locales';

async function bootstrap() {
  // 强阻塞：等待当前所需语言包完全下载并注入引擎后，再渲染 React 根节点
  await setupI18n({
    defaultLocale: 'zh-CN',
    missingWarn: process.env.NODE_ENV !== 'production', // 仅在开发环境打印遗漏警告
  });

  ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
}
bootstrap();
```

---

## ⚠️ 避坑指南（非常重要）

### 1. 杜绝“模块顶层代码执行”陷阱

在编写静态配置文件（如路由表、表单校验规则 Rules 数组）时，**绝对不要在文件顶层直接为变量赋值 `$t('xxx')`**。因为此时国际化引擎尚未初始化，且变量会由于闭包死锁，在切换语言时无法更新。

- ❌ **错误做法（静态死绑定）**：
  ```typescript
  // 文件加载时立即执行了 $t，此时 setupI18n 还没跑完，且后续切换语言无法更新
  export const FORM_RULES = {
    username: [{ required: true, message: $t('error.required') }],
  };
  ```
- 💡 **正确做法（函数包裹/延迟执行/Getter）**：
  ```typescript
  // 改为 Getter 函数。只有当组件真正渲染、调用函数时才会执行 $t，完美避开时序问题并支持响应式
  export const getFormRules = () => ({
    username: [{ required: true, message: $t('error.required') }],
  });
  ```

### 2. 区分组件内外的 `setLocale` 职责

- **组件内**：一律使用 `const { setLocale } = useLocale()`，确保 UI 能够感知并重新渲染。
- **组件外**：一律使用 `import { setLocale } from '@/locales'`，确保异步网络链条正确无误。
