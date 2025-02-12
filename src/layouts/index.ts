// import BasicLayout from './basic';
// import AuthPageLayout from './authentication';

const BasicLayout = () => import('./basic');
const AuthPageLayout = () => import('./authentication');

export { AuthPageLayout, BasicLayout };
