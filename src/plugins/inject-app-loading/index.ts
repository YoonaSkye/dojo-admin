import { type PluginOption } from 'vite';

/**
 * 用于生成将loading样式注入到项目中
 */
function viteInjectAppLoadingPlugin(): PluginOption | undefined {
  const loadingHtml = `
  <style data-app-loading="inject-css">
  html {
    /* same as ant-design-vue/dist/reset.css setting, avoid the title line-height changed */
    line-height: 1.15;
  }

  .loading {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #f4f7f9;

    /* transition: all 0.8s ease-out; */
  }

  .loading.hidden {
    pointer-events: none;
    visibility: hidden;
    opacity: 0;
    transition: all 0.8s ease-out;
  }

  .dark .loading {
    background: #0d0d10;
  }

  .title {
    margin-top: 66px;
    font-size: 28px;
    font-weight: 600;
    color: rgb(0 0 0 / 85%);
  }

  .dark .title {
    color: #fff;
  }

  .loader {
    position: relative;
    width: 48px;
    height: 48px;
  }

  .loader::before {
    position: absolute;
    top: 60px;
    left: 0;
    width: 48px;
    height: 5px;
    content: '';
    background: hsl(var(--primary, 210 100% 50%) / 50%);
    border-radius: 50%;
    animation: shadow-ani 0.5s linear infinite;
  }

  .loader::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: '';
    background: hsl(var(--primary, 210 100% 50%));
    border-radius: 4px;
    animation: jump-ani 0.5s linear infinite;
  }

  @keyframes jump-ani {
    15% {
      border-bottom-right-radius: 3px;
    }

    25% {
      transform: translateY(9px) rotate(22.5deg);
    }

    50% {
      border-bottom-right-radius: 40px;
      transform: translateY(18px) scale(1, 0.9) rotate(45deg);
    }

    75% {
      transform: translateY(9px) rotate(67.5deg);
    }

    100% {
      transform: translateY(0) rotate(90deg);
    }
  }

  @keyframes shadow-ani {
    0%,
    100% {
      transform: scale(1, 1);
    }

    50% {
      transform: scale(1.2, 1);
    }
  }
</style>
<div class="loading" id="__app-loading__">
  <div class="loader"></div>
  <div class="title">Dojo Admin</div>
</div>
  `;

  return {
    enforce: 'pre',
    name: 'vite:inject-app-loading',
    transformIndexHtml: {
      handler(html) {
        const re = /<body\s*>/;
        html = html.replace(re, `<body>${loadingHtml}`);
        return html;
      },
      order: 'pre',
    },
  };
}

export { viteInjectAppLoadingPlugin };
