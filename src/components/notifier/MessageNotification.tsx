// components/MessageNotification.tsx
import React, { useEffect } from 'react';
import { notification } from 'antd';
import { useWebSocket } from '../context/WebSocketContext';

const MessageNotification: React.FC = () => {
  const { messages } = useWebSocket();

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];

      notification.open({
        message: '人员进出信息',
        description: (
          <div>
            <p><strong>姓名:</strong> {lastMessage.personName}</p>
            <p><strong>性别:</strong> {lastMessage.personGender}</p>
            <p><strong>年龄:</strong> {lastMessage.personAge}</p>
            <p><strong>抓拍时间:</strong> {lastMessage.entryTime}</p>
            {lastMessage.faceUrl && (
              <img src={lastMessage.faceUrl} alt="人物照片" style={{ width: 200 }} />
            )}
          </div>
        ),
        placement: 'topRight', // 通知位置
        duration: 5, // 持续时间
      });
    }
  }, [messages]);

  return null; // 组件本身不需要渲染任何东西
};

export default MessageNotification;
