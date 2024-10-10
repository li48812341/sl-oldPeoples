'use client'
// import { useTranslations } from 'next-intl';
import { Button, Input, type FormProps } from 'antd';
import { useState, useRef, useEffect } from 'react';

import Chart from '@/components/Chart';
// import Sortable from 'sortablejs';
import boardList from './board';

export default function Dashboard() {
  // const t = useTranslations();
  const boardContainerRef = useRef<any>();

  useEffect(() => {
    setTimeout(() => {
        // const sortable = new Sortable(document.querySelector('#dashboard') as HTMLElement, {
        //     handle: ".moveBtn"
        // })
    }, 1000)
  }, [boardContainerRef])

  return (
    
      <main>
        <div className="flex flex-wrap" id='dashboard'>
          {
            boardList.map((v, i) => (
              <div key={i} style={{ width: v.w, height: v.h }} className="relative mr-4 mb-4 shadow-md p-2 rounded-lg bg-[rgba(238,239,247,0.2)]">
                {/* <span className="absolute right-2 top-2 hidden cursor-move text-gray-400 z-50 hover:block">
                  <HolderOutlined />
                </span> */}
                <Chart data={v.data} type={v.type} id={v.id} />
              </div>
            ))
          }
        </div>
      </main>
  );
}

