const examples = [
  {
    handle: {
      icon: 'ion:layers-outline',
      keepAlive: true,
      order: 1000,
      title: 'examples.title',
    },
    name: 'Examples',
    path: '/examples',
    children: [
      {
        name: 'CaptchaExample',
        path: '/examples/captcha',
        handle: {
          icon: 'logos:recaptcha',
          title: 'examples.captcha.title',
        },
        children: [
          {
            name: 'DragVerifyExample',
            path: '/examples/captcha/slider',
            component: '/examples/captcha/slider-captcha/index.tsx',
            handle: {
              title: 'examples.captcha.sliderCaptcha',
            },
          },
          {
            name: 'RotateVerifyExample',
            path: '/examples/captcha/slider-rotate',
            component: '/examples/captcha/slider-rotate-captcha/index.tsx',
            handle: {
              title: 'examples.captcha.sliderRotateCaptcha',
            },
          },
          {
            name: 'TranslateVerifyExample',
            path: '/examples/captcha/slider-translate',
            component: '/examples/captcha/slider-translate-captcha/index.tsx',
            handle: {
              title: 'examples.captcha.sliderTranslateCaptcha',
            },
          },
          // {
          //   name: 'CaptchaPointSelectionExample',
          //   path: '/examples/captcha/point-selection',
          //   component: '/examples/captcha/point-selection-captcha/index.tsx',
          //   meta: {
          //     title: 'examples.captcha.pointSelection',
          //   },
          // },
        ],
      },
    ],
  },
];

export { examples };
