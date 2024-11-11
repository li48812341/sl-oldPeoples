import React, { useEffect, useState } from 'react';
import { Button, notification, Space, Row, Col, Typography, Image } from 'antd';

const { Title, Text } = Typography;

type NotificationType = 'success' | 'info' | 'warning' | 'error';
interface PersonData {
    id: string;
    personId?: string;
    personName: string;
    personGender: string;
    personAge: number;
    enterTime?: string;
    exitTime?: string;
    entryTime: string;
    // interval: number;
    // deviceIdIn: string;
    // deviceIdOut: string;
    faceUrl: string; // 假设消息包含图片 URL
}
const App: React.FC = () => {
    const [api, contextHolder] = notification.useNotification();
    const [processedIds, setProcessedIds] = useState<Set<string>>(new Set()); // 用于存储已处理过的消息 ID

    const description = () => {
        return (
            <div>
                <p>这是一条通知</p>
                <p>这是一条通知</p>
                <p>这是一条通知</p>
            </div>
        )
    }
    const openNotification = (personData: any) => {
        console.log(personData)
        // 检查是否已处理过此消息
        if (processedIds.has(personData.id)) return;
        // 标记为已处理
        setProcessedIds(new Set(processedIds).add(personData.id));

        const description = (
            <Row gutter={16}>
                <Col span={12}>
                    <Text><strong>姓名:</strong> {personData.personName}</Text><br />
                    <Text><strong>性别:</strong> {personData.personGender}</Text><br />
                    <Text><strong>年龄:</strong> {personData.personAge}</Text><br />
                    <Text><strong>抓拍时间:</strong> {personData.exitTime}</Text><br />
                </Col>
                <Col span={12}>
                    {personData.faceUrl ? (
                        <Image
                            width={200}
                            src={personData.faceUrl}
                            alt="人物照片"
                        />
                    ) : (
                        <Text>无图片数据</Text>
                    )}
                </Col>
            </Row>
        );

        api.warning({
            message: '人员进出信息',
            description: description,
            onClick: () => {
                console.log('Notification Clicked!');
            },
        });
    };


    const openNotificationWithIcon = (type: NotificationType) => {
        api[type]({
            message: 'Notification Title',
            description: description(),
        });
    };
    const [personData, setPersonData] = useState<PersonData | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false); // 控制 Modal 的显示

    // 创建 WebSocket 连接的函数
    const createWebSocket = (url: string) => {
        const socket = new WebSocket(url);

        socket.onopen = () => {
            console.log('WebSocket 连接已打开');
            socket.send('请求获取个人信息');
        };

        socket.onmessage = (event) => {
            const message = event.data;

            try {
                const result = JSON.parse(message);
                console.log('解析后的数据:', result);
                openNotification(result);
                //   setTimeout(() => {
                //       // 更新状态并显示最新的 Modal
                //       setPersonData({
                //           id: result.id,
                //           // personId: result.personId,
                //           personName: result.personName,
                //           personGender: result.personGender,
                //           personAge: result.personAge,
                //           // enterTime: result.enterTime,
                //           // exitTime: result.exitTime,
                //           entryTime: result.entryTime,
                //           // interval: result.interval,
                //           // deviceIdIn: result.deviceIdIn,
                //           // deviceIdOut: result.deviceIdOut,
                //           faceUrl: result.faceUrl || '', // 假设消息包含图片 URL
                //       });
                //     //   openNotificationWithIcon('info')
                //       openNotification(result);
                //   }, 300); // 延迟300毫秒后弹出新消息
            } catch (e) {
                console.error('JSON 解析错误:', e);
            }
        };

        socket.onclose = () => {
            console.log('WebSocket 连接已关闭');
            // 延迟1秒后尝试重连
            setTimeout(() => {
                createWebSocket(url);
            }, 3000);
        };

        socket.onerror = (error) => {
            console.error('WebSocket 发生错误:', error);
        };
    };

    // 使用 useEffect 来管理 WebSocket 生命周期
    useEffect(() => {
        const socketUrl = `${process.env.NEXT_PUBLIC_WEBSOCKET_API}/converter/websocket/alarm`;

        createWebSocket(socketUrl);
        // return () => {
        //     // 在组件卸载时关闭 WebSocket
        //     if (socket) {
        //         socket.close();
        //     }
        // };
    }, []);
    return (
        <>
            {contextHolder}
            {/* <Space>
        <Button onClick={() => openNotificationWithIcon('success')}>Success</Button>
        <Button onClick={() => openNotificationWithIcon('info')}>Info</Button>
        <Button onClick={() => openNotificationWithIcon('warning')}>Warning</Button>
        <Button onClick={() => openNotificationWithIcon('error')}>Error</Button>
      </Space> */}
        </>
    );
};

export default App;