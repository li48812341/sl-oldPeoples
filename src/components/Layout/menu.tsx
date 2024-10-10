import { FundOutlined, LayoutOutlined, BarChartOutlined, DesktopOutlined, ScheduleOutlined, CalculatorOutlined, UserOutlined, WalletOutlined } from '@ant-design/icons';
import React from 'react';

const navList = [
    {
        key: '/dashboard',
        icon: <BarChartOutlined />,
        label: "首页图表"
      },
      {
        key: '/user',
        icon: <UserOutlined />,
        label: "用户列表"
      },
    {
        key: '/abnormity',
        icon: <LayoutOutlined />,
        label: '异常用户列表'
    },
    {
        key: '/order',
        icon: <ScheduleOutlined />,
        label: '组织管理'
    },
    {
        key: '/resource',
        icon: <WalletOutlined />,
        label: '系统管理'
    },
    
]

export  {navList}