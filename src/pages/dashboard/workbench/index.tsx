import { WorkbenchProjectItem, WorkbenchTrendItem } from '../typing';
import WorkbenchHeader from './components/WorkbenchHeader';
import WorkbenchProject from './components/WorkbenchProject';
import WorkbenchTrends from './components/WorkbenchTrends';

const projectItems: WorkbenchProjectItem[] = [
  {
    color: '',
    content: '不要等待机会，而要创造机会。',
    date: '2021-04-01',
    group: '开源组',
    icon: 'carbon:logo-github',
    title: 'Github',
  },
  {
    color: '#3fb27f',
    content: '现在的你决定将来的你。',
    date: '2021-04-01',
    group: '算法组',
    icon: 'ion:logo-vue',
    title: 'Vue',
  },
  {
    color: '#e18525',
    content: '没有什么才能比努力更重要。',
    date: '2021-04-01',
    group: '上班摸鱼',
    icon: 'ion:logo-html5',
    title: 'Html5',
  },
  {
    color: '#bf0c2c',
    content: '热情和欲望可以突破一切难关。',
    date: '2021-04-01',
    group: 'UI',
    icon: 'ion:logo-angular',
    title: 'Angular',
  },
  {
    color: '#00d8ff',
    content: '健康的身体是实现目标的基石。',
    date: '2021-04-01',
    group: '技术牛',
    icon: 'bx:bxl-react',
    title: 'React',
  },
  {
    color: '#EBD94E',
    content: '路是走出来的，而不是空想出来的。',
    date: '2021-04-01',
    group: '架构组',
    icon: 'ion:logo-javascript',
    title: 'Js',
  },
];

const trendItems: WorkbenchTrendItem[] = [
  {
    avatar: 'svg:avatar-1',
    content: `在 <a>开源组</a> 创建了项目 <a>Vue</a>`,
    date: '刚刚',
    title: '威廉',
  },
  {
    avatar: 'svg:avatar-2',
    content: `关注了 <a>威廉</a> `,
    date: '1个小时前',
    title: '艾文',
  },
  {
    avatar: 'svg:avatar-3',
    content: `发布了 <a>个人动态</a> `,
    date: '1天前',
    title: '克里斯',
  },
  {
    avatar: 'svg:avatar-4',
    content: `发表文章 <a>如何编写一个Vite插件</a> `,
    date: '2天前',
    title: 'Vben',
  },
  {
    avatar: 'svg:avatar-1',
    content: `回复了 <a>杰克</a> 的问题 <a>如何进行项目优化？</a>`,
    date: '3天前',
    title: '皮特',
  },
  {
    avatar: 'svg:avatar-2',
    content: `关闭了问题 <a>如何运行项目</a> `,
    date: '1周前',
    title: '杰克',
  },
  {
    avatar: 'svg:avatar-3',
    content: `发布了 <a>个人动态</a> `,
    date: '1周前',
    title: '威廉',
  },
  {
    avatar: 'svg:avatar-4',
    content: `推送了代码到 <a>Github</a>`,
    date: '2021-04-01 20:00',
    title: '威廉',
  },
  {
    avatar: 'svg:avatar-4',
    content: `发表文章 <a>如何编写使用 Admin Vben</a> `,
    date: '2021-03-01 20:00',
    title: 'Vben',
  },
];

export default function Workbench() {
  return (
    <div className="">
      <WorkbenchHeader />

      <div className="mt-5 flex flex-col lg:flex-row">
        <div className="mr-4 w-full lg:w-3/5">
          <WorkbenchProject items={projectItems} title="项目" />
          <WorkbenchTrends
            items={trendItems}
            className="mt-5"
            title="最新动态"
          />
        </div>
        <div className="w-full lg:w-2/5"></div>
      </div>
    </div>
  );
}
