import { useEffect, useState } from 'react';

interface PersonData {
    id: string;
    personName: string;
    personGender: string;
    personAge: number;
    entryTime: string;
    faceUrl: string;
}

const useWebSocket = (url: string) => {
    const [personData, setPersonData] = useState<PersonData | null>(null);

    useEffect(() => {
        const socket = new WebSocket(url);

        socket.onopen = () => {
            console.log('WebSocket 连接已打开');
        };

        socket.onmessage = (event) => {
            const message = event.data;
            try {
                const result = JSON.parse(message);
                setPersonData({
                    id: result.id,
                    personName: result.personName,
                    personGender: result.personGender,
                    personAge: result.personAge,
                    entryTime: result.entryTime,
                    faceUrl: result.faceUrl || '',
                });
            } catch (e) {
                console.error('JSON 解析错误:', e);
            }
        };

        socket.onclose = () => {
            console.log('WebSocket 连接已关闭');
            // 这里可以选择重连逻辑
        };

        socket.onerror = (error) => {
            console.error('WebSocket 发生错误:', error);
        };

        return () => {
            socket.close(); // 在组件卸载时关闭 WebSocket
        };
    }, [url]);

    return personData;
};

export default useWebSocket;
