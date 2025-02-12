/** The union key namespace */
declare namespace UnionKey {
   /**
   * The layout mode
   *
   * - vertical: the vertical menu in left
   * - horizontal: the horizontal menu in top
   * - vertical-mix: two vertical mixed menus in left
   * - horizontal-mix: the vertical menu in left and horizontal menu in top
   */
   type ThemeLayoutMode = 'horizontal' | 'horizontal-mix' | 'vertical' | 'vertical-mix';
}