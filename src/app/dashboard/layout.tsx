'use client';

import { Layout } from 'antd';

const { Header, Sider, Content } = Layout;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
          {children}
        </Content>
      </Layout>
  );
}

