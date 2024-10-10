import React from 'react';
import { Modal, Typography, Image, Row, Col, Divider } from 'antd';
import useWebSocket from '../hooks/useWebSocket';

const { Text } = Typography;

const MessageModal: React.FC<{ isVisible: boolean; onClose: () => void }> = ({ isVisible, onClose }) => {
    const personData = useWebSocket('ws://183.220.97.47:8080/converter/websocket');

    return (
        <Modal
            title="人员进出信息"
            open={isVisible}
            onOk={onClose}
            onCancel={onClose}
            okText="确认正常"
            cancelText="确认异常"
            width={600}
        >
            <Divider style={{ borderColor: '#f4e9e9' }} />
            <Row gutter={16}>
                <Col span={12}>
                    {personData ? (
                        <div>
                            <Text><strong>姓名:</strong> {personData.personName}</Text><br />
                            <Text><strong>性别:</strong> {personData.personGender}</Text><br />
                            <Text><strong>年龄:</strong> {personData.personAge}</Text><br />
                            <Text><strong>抓拍时间:</strong> {personData.entryTime}</Text><br />
                        </div>
                    ) : (
                        <Text>等待接收消息...</Text>
                    )}
                </Col>
                <Col span={12}>
                    {personData && personData.faceUrl ? (
                        <Image width={200} src={personData.faceUrl} alt="人物照片" />
                    ) : (
                        <Text>无图片数据</Text>
                    )}
                </Col>
            </Row>
        </Modal>
    );
};

export default MessageModal;

