import { useCollapsed, useUserActions } from '@/store/userStore';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout, theme } from 'antd';
import LayoutMenu from './menu';

const { Sider, Header, Content } = Layout;

export default function DefaultLayout() {
  const collapsed = useCollapsed();
  const { setCollapsed } = useUserActions();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout className="flex flex-col w-full min-h-full bg-[#f4f7f9]">
      <Layout className="min-h-full">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <LayoutMenu />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
