<div align="center">
<br />
<img src='./src/assets/images/background/dojo.png' height='140'>
<h1>Dojo Admin 🌈
</h1>
</div>

## 简介

Dojo Admin 是一个基于 React 18、Shadcn UI、Ant Design、Tailwind CSS、Zustand、Vite 和 TypeScript 的中后台解决方案，目标是为开发中大型项目提供开箱即用的解决方案。包括二次封装组件、utils、hooks、动态菜单、权限校验、多主题配置、按钮级别权限控制等功能。项目会使用前端较新的技术栈，可以作为项目的启动模板，以帮助你快速搭建企业级中后台产品原型。

## 预览

| ![login-page.png](/public//demo/login.png)       | ![dashboard-page.png](/public/demo/dashboard-page.png)   |
| ------------------------------------------------ | -------------------------------------------------------- |
| ![dark-mode.png](/public/demo/dark.png)          | ![settings-drawer.png](/public/demo/settings-drawer.png) |
| ![user-manage.png](/public/demo/user-manage.png) | ![search.png](/public//demo/search.png)                  |
| ![multi-theme.png](/public/demo/multi-theme.png) | ![search.png](/public/demo/404-page.png)                 |

## 特性

- **最新技术栈**：使用 React 18、Tailwindcss、Ant-Design、Shadcn-UI、Zustand、Echarts 等前端前沿技术开发。
- **国际化**：内置完善的国际化方案，支持多语言切换。
- **权限验证**：完善的权限验证方案，提供前端访问和后端两种访问控制，按钮级别权限控制。
- **多主题**：将 Antd 的主题定制和 tailwindcss 的 css 变量结合，内置多种主题配置和黑暗模式，满足个性化需求。
- **动态菜单**：支持动态菜单，可以根据权限配置显示菜单。
- **组件丰富**：提供了丰富的组件，可以满足大部分的业务需求。
- **Antd 结合 Headless 组件**：支持 Ant Design 和 ShadCn UI。
- **后台管理**：集成常见的后台管理功能，如用户管理、角色管理、菜单管理。
- **Mock 数据**：基于 MSW 的高性能 Mock 数据方案。
- **规范**：代码规范，使用 ESLint、Prettier、Stylelint 等工具保证代码质量。

## 快速开始

### 获取项目代码

```bash
git clone https://github.com/YoonaSkye/dojo-admin
```

### 安装依赖

在项目根目录下运行以下命令安装项目依赖：

```bash
npm install
```

### 启动开发服务器

运行以下命令以启动开发服务器：

```bash
npm run dev
```

访问 [http://localhost:5173](http://localhost:5173) 查看您的应用程序。

### 构建生产版本

运行以下命令以构建生产版本：

```bash
npm run build
```

构建后的文件将位于 `dist` 目录中。
