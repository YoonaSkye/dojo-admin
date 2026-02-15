# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Dojo Admin is a React 18 + TypeScript admin template with Vite. It's designed as an enterprise-level admin system with dynamic routing, permission control, multi-theme support, and component libraries (Ant Design + Shadcn UI).

## Development Commands

```bash
# Start development server
npm run dev

# Build for production (runs TypeScript check then Vite build)
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview
```

## Architecture

### Dynamic Routing System

This project uses a **backend-driven dynamic routing** system:

- Routes are fetched from backend via `getAllMenusApi()` and dynamically loaded
- Route patching happens through React Router v6's `patchRoutesOnNavigation` option
- The router is initialized in [src/router/router.tsx](src/router/router.tsx)
- Auth routes are initialized in [src/router/utils/initRoutes.ts](src/router/utils/initRoutes.ts)
- Backend menu data is converted to routes in [src/router/utils/generate-routes-backend.tsx](src/router/utils/generate-routes-backend.tsx)

**Key behavior**: Routes are lazy-loaded and only patched after authentication. The `isAccessChecked` flag in the access store controls whether routes need initialization.

### Route Meta System

Routes define behavior through the `handle.meta` property ([RouteMeta](src/types/router.d.ts)):

- `hideInMenu` - Hide route from sidebar menu
- `hideInTab` - Hide from tab bar
- `hideInBreadcrumb` - Hide from breadcrumb
- `affixTab` - Pin tab to stay open
- `keepAlive` - Enable KeepAlive caching
- `ignoreAccess` - Bypass permission check
- `constant` - Always available route (like login)
- `authority` - Required permission codes

### State Management (Zustand)

Stores are located in [src/store/](src/store/):

- **access.ts** - Authentication, access tokens, permissions, routes, menus
- **preferences.ts** - UI settings (theme, layout mode, sidebar/header config)
- **user.ts** - User profile info
- **tabs.ts** - Open tabs management

All stores use `zustand/middleware/persist` for localStorage persistence. When logging out, use `resetAllStores()` to clear all stores.

### Theme System

The theme system combines Ant Design theme customization with Tailwind CSS variables:

- Theme preferences stored in [src/features/preferences/theme/](src/features/preferences/theme/)
- Built-in themes defined in `BUILT_IN_THEME_PRESETS`
- CSS variables updated via `updateCSSVariables()`
- Supports light/dark mode switching
- Multiple layout modes: vertical, horizontal, etc.

### Layout Structure

- Main layout: [src/layouts/basic/](src/layouts/basic/)
- Layout includes: sidebar menu, header, tabbar, breadcrumb, footer
- Layout components are wrapped in providers (Theme, Antd, App)

### API Layer

- Request client in [src/api/request.ts](src/api/request.ts) wraps Axios
- Auto-includes `Authorization: Bearer {token}` header when access token exists
- Base URL from `VITE_APP_BASE_API` env variable
- Proxied through Vite dev server to mock API at Apifox

## Important Conventions

1. **Route Changes**: When adding routes, check if they need auth protection. Constant routes (login, 404) are defined in [src/router/routes/core.tsx](src/router/routes/core.tsx).

2. **Permission Checks**: Use `useAccessStore` for auth state and access codes. For button-level permissions, check against `accessCodes` array.

3. **Logout Flow**: Must use `startTransition()` when logging out to properly handle React's Suspense. Sequence: clear storage → reset stores → reset routes → navigate to login.

4. **Component Libraries**:
   - Use Ant Design for complex components (tables, forms)
   - Use Shadcn UI (Radix UI primitives) for headless, customizable components
   - Both libraries coexist with consistent theming

5. **File Paths**: Use `@/` alias for src directory imports (configured in vite.config.ts and tsconfig.json).
