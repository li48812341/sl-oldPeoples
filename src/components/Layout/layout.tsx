'use client';

import { Layout, Menu ,Dropdown, Avatar} from 'antd';
import { UserOutlined, BarChartOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const { Header, Sider, Content,} = Layout;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]); // 当前选中的菜单项
  const pathname = usePathname();
  const router = useRouter();
  // TODO: 根据路径动态设置选中的菜单项优化
  useEffect(() => {
    // 根据路径动态设置选中的菜单项
    if (pathname === '/dashboard') {
      setSelectedKeys(['1']);
    } else if (pathname === '/user') {
      setSelectedKeys(['2']);
    }
  }, [pathname]); 

  const handleMenuClick = (e: { key: string }) => {
    setSelectedKeys([e.key]); 
    if (e.key === '1') {
      router.push('/dashboard'); 
    } else if (e.key === '2') {
      router.push('/user'); 
    }
  };
  const handleLogout = () => {
    // 清除用户认证信息（例如，从 localStorage 中移除 token）
    localStorage.removeItem('userToken');
    // 重定向到登录页面
    router.push('/');
  };
  const items = [
    {
      key: '1',
      icon: <BarChartOutlined />,
      label: <Link href="/dashboard">首页图表</Link>,
    },
    {
      key: '2',
      icon: <UserOutlined />,
      label: <Link href="/user">用户列表</Link>,
    },
  ];
  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: '#fff',
    height: 64,
    paddingInline: 48,
    lineHeight: '64px',
    backgroundColor: '#4096ff',
  };
 
  const menu = (
    <Menu>
      <Menu.Item key="logout" onClick={handleLogout}>
        退出
      </Menu.Item>
    </Menu>
  );
  return (
    <html lang="en">
      <body>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
            <div style={{ color: 'white', padding: '16px', textAlign: 'center' }}>
              <h2 style={{ color: 'white' }}>管理后台</h2>
            </div>
            <Menu theme="dark" mode="inline" items={items} selectedKeys={selectedKeys} onClick={handleMenuClick}/>
          </Sider>
          <Layout>
            <Header style={headerStyle} >
            <div style={{ flex: 1, textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}>
              人员信息管理平台
            </div>
            <Dropdown overlay={menu} placement="bottomRight" arrow>
              <Avatar style={{ cursor: 'pointer' }} icon={<UserOutlined />} />
            </Dropdown>
             
            </Header>
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
              {children}
            </Content>
            {/* <Footer style={footerStyle}>Footer</Footer> */}
          </Layout>
        </Layout>
      </body>
    </html>
  );
}



