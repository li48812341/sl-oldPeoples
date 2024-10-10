'use client';

import { Layout, Menu, Button, Dropdown, Avatar } from 'antd';
import { UserOutlined, BarChartOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const { Header, Sider, Content, Footer } = Layout;

export default function UserLayout({ children }: { children: React.ReactNode }) {

  const router = useRouter();
  const handleLogout = () => {
    // 清除用户认证信息（例如，从 localStorage 中移除 token）
    localStorage.removeItem('userToken');
    // 重定向到登录页面
    router.push('/');
  };

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
  const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
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

    <Layout>
      <Header style={headerStyle} >
        <div style={{ flex: 1, textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}>
          人员进出管理平台
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
  );
}



