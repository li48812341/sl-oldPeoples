// app/store/useWebSocketStore.js
import {create} from 'zustand';

const useWebSocketStore = create((set) => ({
  messages: [],
  addMessage: (message: any) => set((state: { messages: any; }) => ({
    messages: [...state.messages, message],
  })),
}));

export default useWebSocketStore;
