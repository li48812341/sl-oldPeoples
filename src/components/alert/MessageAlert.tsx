import React, { useEffect } from 'react';
import { notification } from 'antd';
import useWebSocket from '../hooks/useWebSocket';

const MessageAlert: React.FC = () => {
    const personData = useWebSocket('ws://183.220.97.47:8080/converter/websocket/alarm');

    useEffect(() => {
        if (personData) {
            notification.info({
                message: '人员进出信息',
                description: (
                    <div>
                        <p><strong>姓名:</strong> {personData.personName}</p>
                        <p><strong>性别:</strong> {personData.personGender}</p>
                        <p><strong>年龄:</strong> {personData.personAge}</p>
                        <p><strong>抓拍时间:</strong> {personData.entryTime}</p>
                        {personData.faceUrl && (
                            <img src={personData.faceUrl} alt="人物照片" style={{ width: 200 }} />
                        )}
                    </div>
                ),
                placement: 'topRight',
                duration: 5,
            });
        }
    }, [personData]);

    return null;
};

export default MessageAlert;

