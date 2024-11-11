'use client';

import { Layout, Menu } from 'antd';
import { useState, useEffect, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { navList } from './menu';
import React from 'react';
const { Sider } = Layout;

function SiderLayout() {
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    // 从 localStorage 中获取折叠状态，如果没有则默认为 false
    if (typeof window !== 'undefined') {
      return localStorage.getItem('collapsed') === 'true';
    }
    return false;
  });
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const pathname = usePathname();
  const router = useRouter();

  // 设置选中的菜单项
  useEffect(() => {
    setSelectedKeys([pathname]);
  }, [pathname]);

  // 处理菜单点击事件
  const handleMenuClick = (e: { key: string }) => {
    setSelectedKeys([e.key]);
    router.push(e.key);
  };

  // 更新折叠状态并保存到 localStorage
  const handleCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
    if (typeof window !== 'undefined') {
      localStorage.setItem('collapsed', collapsed.toString());
    }
  };
  // 后期路由可配置
  const menuItems = useMemo(() => navList, []);
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={handleCollapse}
      style={{ minHeight: '100vh' }}
    >
      <div style={{ color: 'white', padding: '16px', textAlign: 'center' }}>
        <h2 style={{ color: 'white' }}>人员进出管理后台</h2>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        items={menuItems}
        selectedKeys={selectedKeys}
        onClick={handleMenuClick}
      />
    </Sider>
  );
}

export default React.memo(SiderLayout);




