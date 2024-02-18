import Header from './header';
import Main from './Main';
import Nav from './Nav';
export default function DashboardLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* layout 采用两栏布局 */}
      {/* header 采用绝对布局 */}
      <Header />
      {/* nav */}
      <Nav />
      {/* main content */}
      {/* DashboardLayout */}
      <Main />
    </div>
  );
}
