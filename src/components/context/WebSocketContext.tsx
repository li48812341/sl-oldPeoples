
import React, { createContext, useContext, useEffect, useState } from 'react';

interface Message {
  id: string;
  personName: string;
  personGender: string;
  personAge: number;
  entryTime: string;
  faceUrl?: string;
}

interface WebSocketContextType {
  messages: Message[];
  addMessage: (message: Message) => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  useEffect(() => {
    const socketUrl = 'ws://183.220.97.47:8080/converter/websocket';
    const socket = new WebSocket(socketUrl);

    socket.onopen = () => {
      console.log('WebSocket 连接已打开');
    };

    socket.onmessage = (event) => {
      const message = event.data;
      try {
        const result: Message = JSON.parse(message);
        addMessage(result);
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

    return () => {
      socket.close();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ messages, addMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};

