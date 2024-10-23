import React, { useEffect, useState } from 'react';
import { Modal, Typography, Image, Row, Col, Divider ,message } from 'antd';

import {confirmEntryStatus} from '@/lib/service/common';

const { Title, Text } = Typography;
import  useStore  from '@/components/store/store';

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
interface WebSocketComponentProps {
    updateList?: () => void; // 可选的更新父组件列表的方法
  }
const WebSocketComponent: React.FC<WebSocketComponentProps> = ({
    updateList
}) => {
    const [personData, setPersonData] = useState<PersonData | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false); // 控制 Modal 的显示
    const { refreshList2, setRefreshPersonList,setRefreshAbnormityList } = useStore(); // 刷新列表
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
                // 关闭当前的 Modal，延迟显示新的 Modal
                setIsModalVisible(false);
                setTimeout(() => {
                    // 更新状态并显示最新的 Modal
                    setPersonData({
                        id: result.id,
                        // personId: result.personId,
                        personName: result.personName,
                        personGender: result.personGender,
                        personAge: result.personAge,
                        // enterTime: result.enterTime,
                        // exitTime: result.exitTime,
                        entryTime: result.entryTime,
                        // interval: result.interval,
                        // deviceIdIn: result.deviceIdIn,
                        // deviceIdOut: result.deviceIdOut,
                        faceUrl: result.faceUrl || '', // 假设消息包含图片 URL
                    });
                    setIsModalVisible(true); // 显示新的 Modal
                    console.log('新的数据:', updateList);
                    // updateList()
                }, 300); // 延迟300毫秒后弹出新消息
            } catch (e) {
                console.error('JSON 解析错误:', e);
            }
        };

        socket.onclose = () => {
            console.log('WebSocket 连接已关闭');
            // 延迟1秒后尝试重连
            setTimeout(() => {
                createWebSocket(url);
            }, 1000);
            };

        socket.onerror = (error) => {
            console.error('WebSocket 发生错误:', error);
        };
    };

    // 使用 useEffect 来管理 WebSocket 生命周期
    useEffect(() => {
        const socketUrl = `${process.env.NEXT_PUBLIC_WEBSOCKET_API}/converter/websocket`;

        createWebSocket(socketUrl);
        // createWebSocket(socketUrl1);
        // return () => {
        //     // 在组件卸载时关闭 WebSocket
        //     if (socket) {
        //         socket.close();
        //     }
        // };
    }, []);

    // 关闭 Modal
    const handleOk = () => {

        const params = {
            id: personData?.id as string,
            entryStatus: 0,
        }
        confirmEntryStatus(params).then((res: any) => {
            console.log(res)
            if (res.code === 200) {
                setIsModalVisible(false);
                setRefreshPersonList(true)
                setRefreshAbnormityList(true)
            }else {
                message.error(res.msg)
            }
      
          })
          
        
    };
    // const handleOk = (close: () => void) => {
    //     return new Promise((resolve, reject) => {
    //         // 在这里进行任何异步操作，比如请求 API
    //         // 假设请求成功时
    //         setIsModalVisible(false);
    //         resolve(); // 正常关闭
    //         // 如果有错误，调用 reject()
    //     });
    // };

    const handleCancel = () => {
        return new Promise<void>(async(resolve) => {
            // setIsModalVisible(false);
            const params = {
                id: personData?.id as string,
                entryStatus: 1,
            }
            confirmEntryStatus(params).then((res: any) => {
                console.log(res)
                if (res.code === 200) {
                    setIsModalVisible(false);
                    setRefreshPersonList(true)
                    setRefreshAbnormityList(true)
                    resolve()
                }else {
                    message.error(res.msg)
                }
          
              })
            ; // 正常关闭
        });
    };
    return (
        <div>
             <Modal
                title="人员进出信息"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="确认正常"
                cancelText="确认异常"
                width={600} // 自定义宽度
                
            >
                <Divider style={{  borderColor: '#f4e9e9' }}></Divider>
                <Row gutter={16}>
                    {/* 左侧文本信息 */}
                    <Col span={12}>
                        {personData ? (
                            <div>
                                {/* <Title level={4}>人员进出管理</Title> */}
                                <Text><strong>姓名:</strong> {personData.personName}</Text><br />
                                <Text><strong>性别:</strong> {personData.personGender}</Text><br />
                                <Text><strong>年龄:</strong> {personData.personAge}</Text><br />
                                {/* <Text><strong>进入时间:</strong> {personData.enterTime}</Text><br />
                                <Text><strong>离开时间:</strong> {personData.exitTime}</Text><br /> */}
                                <Text><strong>抓拍时间:</strong> {personData.entryTime}</Text><br />
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

export default WebSocketComponent;

