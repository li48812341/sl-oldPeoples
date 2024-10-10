'use client';
import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Layout } from 'antd';
import { usePathname } from 'next/navigation';
import './globals.css';
import SiderLayout from '@/components/Layout/sider'
const { Sider, Content } = Layout;

// WebSocketProvider 
import { WebSocketProvider } from '@/components/context/WebSocketContext';

// import  PersonAlarm from '@/components/alert/alarm';
import  PersonModal from '@/components/modal/modal';
import  PersonNotification from '@/components/notifier/notifier';
const RootLayout = ({ children }: React.PropsWithChildren) => {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login'; // 假设登录页面的路径是 '/login'
  const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#fff',
    padding: '0px 0px',
  };

  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <Layout style={{ minHeight: '100vh' }}>
            {!isLoginPage && <SiderLayout></SiderLayout>}
            {/* {children} */}
            <PersonNotification></PersonNotification>
            <PersonModal></PersonModal>
            <Content style={contentStyle}>{children}</Content>
          </Layout>
        </AntdRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
