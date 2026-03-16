export type TableColumnCheck = {
  checked: boolean;
  key: string;
  title: string;
};

/**
 * the type of table operation
 *
 * - add: add table item
 * - edit: edit table item
 */
export type TableOperateType = 'add' | 'edit';
