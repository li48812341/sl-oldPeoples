'use client'
// import { useTranslations } from 'next-intl';
import { Button, Spin } from 'antd';
import { useState, useRef, useEffect } from 'react';
import { checkData } from './api';
import Chart from '@/components/Chart';

export default function Dashboard() {
  // const t = useTranslations();
  const boardContainerRef = useRef<any>();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkData().then((res: any) => {
        setList(res.data);
        setLoading(false);
    })
  }, []);

  return (

      <main className="min-h-[calc(100vh-200px)] flex flex-wrap">
        <Spin tip="数据加载中..." size="large" spinning={loading}>
          <div className="flex flex-wrap min-h-[calc(100vh-200px)]" ref={boardContainerRef}>
            {
              list.map((v: any, i) => {
                return (
                  <div key={i} style={{ width: v.w, height: v.h }} className="relative mr-4 mb-4 shadow-md p-2 rounded-lg bg-[rgba(238,239,247,0.2)]">
                    <Chart data={v.data} type={v.type} id={v.id} />
                  </div>
                );
              })
            }
          </div>
        </Spin>
      </main>
  );
}
