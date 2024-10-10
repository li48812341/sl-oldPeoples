import { useEffect, useRef } from 'react';
import createChart from './tool';
import { isDev } from '@/utils';

interface IChart {
    type: string,
    id: string,
    data: any
}

const MyChart = (props: IChart) => {
    const chartRef = useRef<any>(null);
    const { type, data, id } =props;
    useEffect(() => {
        let chart:any;
        // 避免在开发环境渲染两次
    if(isDev) {
        const curCache = localStorage.getItem(id);
        if(!curCache) {
            localStorage.setItem(id, '1');
            chart = createChart(chartRef.current, type, data);
        } 
    }
    return () => {
        localStorage.removeItem(id);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        chart && chart.destroy();
    }
    }, [type, data, id]);
    return <div style={{
        width: '100% !important',
        height: '280px !important'
    }} ref={chartRef}></div>
}

export default MyChart