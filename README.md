<div align="center"> 
<br> 
<br>
<img src='./src/assets/images/background/dojo.png' height='140'>
<h1>Dojo Admin 🌈
</h1>
</div>

## 简介

Dojo Admin 是一个现代化的后台管理模板，基于 React 18、Zustand、Vite、Ant Design 和 TypeScript 构建。它旨在帮助开发人员快速搭建功能强大的后台管理系统。

## 预览

| ![login.png](/public//demo/login-page.png)           | ![dashboard.png](/public/demo/dashboard.png) |
| ---------------------------------------------------- | -------------------------------------------- |
| ![dark-mode.png](/public/demo/dark-mode.png)         | ![setting.png](/public/demo/setting.png)     |
| ![dark-mode.png](/public/demo/horizontal-layout.png) |

## 特性

- 使用 React18 + TypeScript 开发，整个项目使用高质量 Hooks + TypeScript 代码完成
- 项目菜单、路由权限使用 动态路由 控制，完全根据后端菜单数据动态生成路由
- 使用 zustand 作为状态管理工具，集成 zustand-persist 持久化工具
- 使用 Ant-Design 5 组件库开发，将 Design Token 注入到 CSS 变量中，方便配置项目主题
- 项目支持多布局：横向布局、经典布局（可开启菜单分割功能）、纵向布局
- 项目支持多主题：主题颜色、暗黑模式配置
- 项目其它功能：菜单手风琴模式、无限级菜单、多标签页、详情页标签、面包屑导航
- 集成权限管理，根据用户角色控制页面访问权限
- 集成国际化支持，轻松切换多语言
- 集成常见的后台管理功能，如用户管理、角色管理、权限管理等
- 基于 MSW 和 Faker.js 的 Mock 方案

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

参考[.commitlint.config.js](./commitlint.config.js)

- `feat` 新功能
- `fix` 修复 bug
- `docs` 文档注释
- `style` 代码格式(不影响代码运行的变动)
- `refactor` 重构
- `perf` 性能优化
- `revert` 回滚 commit
- `test` 测试相关
- `chore` 构建过程或辅助工具的变动
- `ci` 修改 CI 配置、脚本
- `types` 类型定义文件修改
- `wip` 开发中
