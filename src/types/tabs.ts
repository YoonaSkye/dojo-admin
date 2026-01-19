import type { Route } from './router';

export interface TabDefinition extends Route {
  key?: string;
}

export interface IContextMenuItem {
  /**
   * @zh_CN 是否禁用
   */
  disabled?: boolean;
  /**
   * @zh_CN 点击事件处理
   * @param data
   */
  handler?: (data: any) => void;
  /**
   * @zh_CN 图标
   */
  icon?: React.ComponentType<any>;
  /**
   * @zh_CN 是否显示图标
   */
  inset?: boolean;
  /**
   * @zh_CN 唯一标识
   */
  key: string;
  /**
   * @zh_CN 是否是分割线
   */
  separator?: boolean;
  /**
   * @zh_CN 快捷键
   */
  shortcut?: string;
  /**
   * @zh_CN 标题
   */
  text: string;
}

export interface TabsProps {
  active: string;
  /**
   * @zh_CN 右键菜单
   */
  contextMenus: (data: any) => IContextMenuItem[];
  /**
   * @zh_CN 是否显示图标
   */
  showIcon?: boolean;
  /**
   * @zh_CN 选项卡数据
   */
  tabs: TabDefinition[] | undefined;
  onActiveChange: (key: string) => void;
  onClose: (key: string) => void;
}

export interface TabConfig extends TabDefinition {
  // affixTab: boolean;
  // closable: boolean;
  icon: string;
  key: string;
  title: string;
}
