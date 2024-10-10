'use client';

import { Layout, Menu } from 'antd';
import { UserOutlined, BarChartOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const { Sider } = Layout;

import {navList} from './menu';

export default function SiderLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]); // 当前选中的菜单项
  const pathname = usePathname();
  const router = useRouter();
  // TODO: 根据路径动态设置选中的菜单项优化
  useEffect(() => {
    setSelectedKeys([pathname]); // 更新选中项
  }, [pathname]);

  const handleMenuClick = (e: { key: string }) => {
    setSelectedKeys([e.key]);
    console.log(e);
    console.log(pathname)
    router.push(e.key);
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

  return (

    <Sider style={{ minHeight: '100vh' }} collapsible collapsed={collapsed} onCollapse={setCollapsed}>
      <div style={{ color: 'white', padding: '16px', textAlign: 'center' }}>
        <h2 style={{ color: 'white' }}>人员进出管理后台</h2>
      </div>
      <Menu theme="dark" mode="inline" items={navList} selectedKeys={selectedKeys} onClick={handleMenuClick} />
    </Sider>
  );
}



