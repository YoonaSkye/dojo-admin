const dataOption = {
  legend: {
    bottom: 0,
    data: ['访问', '趋势'],
  },
  radar: {
    indicator: [
      {
        name: '网页',
      },
      {
        name: '移动端',
      },
      {
        name: 'Ipad',
      },
      {
        name: '客户端',
      },
      {
        name: '第三方',
      },
      {
        name: '其它',
      },
    ],
    radius: '60%',
    splitNumber: 8,
  },
  series: [
    {
      areaStyle: {
        opacity: 1,
        shadowBlur: 0,
        shadowColor: 'rgba(0,0,0,.2)',
        shadowOffsetX: 0,
        shadowOffsetY: 10,
      },
      data: [
        {
          itemStyle: {
            color: '#b6a2de',
          },
          name: '访问',
          value: [90, 50, 86, 40, 50, 20],
        },
        {
          itemStyle: {
            color: '#5ab1ef',
          },
          name: '趋势',
          value: [70, 75, 70, 76, 20, 85],
        },
      ],
      itemStyle: {
        // borderColor: '#fff',
        borderRadius: 10,
        borderWidth: 2,
      },
      symbolSize: 0,
      type: 'radar',
    },
  ],
  tooltip: {},
};

const sourceOption = {
  legend: {
    bottom: '2%',
    left: 'center',
  },
  series: [
    {
      animationDelay() {
        return Math.random() * 100;
      },
      animationEasing: 'exponentialInOut',
      animationType: 'scale',
      avoidLabelOverlap: false,
      color: ['#5ab1ef', '#b6a2de', '#67e0e3', '#2ec7c9'],
      data: [
        { name: '搜索引擎', value: 1048 },
        { name: '直接访问', value: 735 },
        { name: '邮件营销', value: 580 },
        { name: '联盟广告', value: 484 },
      ],
      emphasis: {
        label: {
          fontSize: '12',
          fontWeight: 'bold',
          show: true,
        },
      },
      itemStyle: {
        // borderColor: '#fff',
        borderRadius: 10,
        borderWidth: 2,
      },
      label: {
        position: 'center',
        show: false,
      },
      labelLine: {
        show: false,
      },
      name: '访问来源',
      radius: ['40%', '65%'],
      type: 'pie',
    },
  ],
  tooltip: {
    trigger: 'item',
  },
};

const salesOption = {
  series: [
    {
      animationDelay() {
        return Math.random() * 400;
      },
      animationEasing: 'exponentialInOut',
      animationType: 'scale',
      center: ['50%', '50%'],
      color: ['#5ab1ef', '#b6a2de', '#67e0e3', '#2ec7c9'],
      data: [
        { name: '外包', value: 500 },
        { name: '定制', value: 310 },
        { name: '技术支持', value: 274 },
        { name: '远程', value: 400 },
      ].sort((a, b) => {
        return a.value - b.value;
      }),
      name: '商业占比',
      radius: '80%',
      roseType: 'radius',
      type: 'pie',
    },
  ],

  tooltip: {
    trigger: 'item',
  },
};

const trends = {
  grid: {
    bottom: 0,
    containLabel: true,
    left: '1%',
    right: '1%',
    top: '2 %',
  },
  series: [
    {
      areaStyle: {},
      data: [
        111, 2000, 6000, 16_000, 33_333, 55_555, 64_000, 33_333, 18_000, 36_000,
        70_000, 42_444, 23_222, 13_000, 8000, 4000, 1200, 333, 222, 111,
      ],
      itemStyle: {
        color: '#5ab1ef',
      },
      smooth: true,
      type: 'line',
    },
    {
      areaStyle: {},
      data: [
        33, 66, 88, 333, 3333, 6200, 20_000, 3000, 1200, 13_000, 22_000, 11_000,
        2221, 1201, 390, 198, 60, 30, 22, 11,
      ],
      itemStyle: {
        color: '#019680',
      },
      smooth: true,
      type: 'line',
    },
  ],
  tooltip: {
    axisPointer: {
      lineStyle: {
        color: '#019680',
        width: 1,
      },
    },
    trigger: 'axis',
  },
  // xAxis: {
  //   axisTick: {
  //     show: false,
  //   },
  //   boundaryGap: false,
  //   data: Array.from({ length: 18 }).map((_item, index) => `${index + 6}:00`),
  //   type: 'category',
  // },
  xAxis: {
    axisTick: {
      show: false,
    },
    boundaryGap: false,
    data: Array.from({ length: 18 }).map((_item, index) => `${index + 6}:00`),
    splitLine: {
      lineStyle: {
        type: 'solid',
        width: 1,
      },
      show: true,
    },
    type: 'category',
  },
  yAxis: [
    {
      axisTick: {
        show: false,
      },
      max: 80_000,
      splitArea: {
        show: true,
      },
      splitNumber: 4,
      type: 'value',
    },
  ],
};

const visits = {
  grid: {
    bottom: 0,
    containLabel: true,
    left: '1%',
    right: '1%',
    top: '2 %',
  },
  series: [
    {
      barMaxWidth: 80,
      // color: '#4f69fd',
      data: [
        3000, 2000, 3333, 5000, 3200, 4200, 3200, 2100, 3000, 5100, 6000, 3200,
        4800,
      ],
      type: 'bar',
    },
  ],
  tooltip: {
    axisPointer: {
      lineStyle: {
        // color: '#4f69fd',
        width: 1,
      },
    },
    trigger: 'axis',
  },
  xAxis: {
    data: Array.from({ length: 12 }).map((_item, index) => `${index + 1}月`),
    type: 'category',
  },
  yAxis: {
    max: 8000,
    splitNumber: 4,
    type: 'value',
  },
};

const chartTabOptions = {
  ['trends']: trends,
  ['visits']: visits,
};

export {
  dataOption,
  sourceOption,
  salesOption,
  trends,
  visits,
  chartTabOptions,
};
