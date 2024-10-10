import React, { useEffect, useState } from 'react';
import { Modal, Typography, Image, Row, Col } from 'antd';

const { Title, Text } = Typography;

interface PersonData {
    personId: string;
    personName: string;
    personGender: string;
    personAge: number;
    enterTime: string;
    exitTime: string;
    interval: number;
    deviceIdIn: string;
    deviceIdOut: string;
    faceUrl: string; // 假设消息包含图片 URL
}

const modalTest: React.FC = () => {
    const [personData, setPersonData] = useState<PersonData | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(true); // 控制 Modal 的显示

    // 创建 WebSocket 连接的函数
    const createWebSocket = (url: string) => {
        const socket = new WebSocket(url);

        socket.onopen = () => {
            console.log('WebSocket 连接已打开');
            socket.send('请求获取个人信息');
        };

        socket.onmessage = (event) => {
            const message = event.data;
            console.log('接收到消息:', message);

            try {
                const result = JSON.parse(message);

                // 关闭当前的 Modal，延迟显示新的 Modal
                setIsModalVisible(false);
                setTimeout(() => {
                    // 更新状态并显示最新的 Modal
                    setPersonData({
                        personId: result.personId,
                        personName: result.personName,
                        personGender: result.personGender,
                        personAge: result.personAge,
                        enterTime: result.enterTime,
                        exitTime: result.exitTime,
                        interval: result.interval,
                        deviceIdIn: result.deviceIdIn,
                        deviceIdOut: result.deviceIdOut,
                        faceUrl: result.faceUrl || '', // 假设消息包含图片 URL
                    });
                    setIsModalVisible(true); // 显示新的 Modal
                }, 300); // 延迟300毫秒后弹出新消息
            } catch (e) {
                console.error('JSON 解析错误:', e);
            }
        };

        socket.onclose = () => {
            console.log('WebSocket 连接已关闭');
        };

        socket.onerror = (error) => {
            console.error('WebSocket 发生错误:', error);
        };
    };

    // 使用 useEffect 来管理 WebSocket 生命周期
    useEffect(() => {
        const socketUrl = 'ws://36.133.62.220:30080/converter/websocket';
        const socket =createWebSocket(socketUrl);

        return () => {
            // 在组件卸载时关闭 WebSocket
            // if (socket) {
            //     socket.close();
            // }
        };
    }, []);

    // 关闭 Modal
    const handleOk = () => {
        setIsModalVisible(false);
    };

    return (
        <div>
            <Modal
                title="个人信息"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleOk}
                okText="确认"
                cancelText="关闭"
                width={800} // 自定义宽度
            >
                <Row gutter={16}>
                    {/* 左侧文本信息 */}
                    <Col span={12}>
                        {!personData ? (
                            <div>
                                <Title level={4}>基本信息</Title>
                                <Text><strong>ID:</strong> {"personData.personId"}</Text><br />
                                <Text><strong>姓名:</strong> {"personData.personName"}</Text><br />
                                <Text><strong>性别:</strong> {"personData.personGender"}</Text><br />
                                <Text><strong>年龄:</strong> {"personData.personAge"}</Text><br />
                                <Text><strong>进入时间:</strong> {"personData.enterTime"}</Text><br />
                                <Text><strong>离开时间:</strong> {"personData.exitTime"}</Text><br />
                                <Text><strong>停留时间:</strong> {"personData.interval"} 分钟</Text><br />
                                <Text><strong>进入设备ID:</strong> {"personData.deviceIdIn"}</Text><br />
                                <Text><strong>离开设备ID:</strong> {"personData.deviceIdOut"}</Text>
                            </div>
                        ) : (
                            <Text>等待接收消息...</Text>
                        )}
                    </Col>

                    {/* 右侧图片 */}
                    <Col span={12}>
                        {personData && personData.faceUrl ? (
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
            </Modal>
        </div>
    );
};

export default modalTest;
