// store.ts
import {create} from 'zustand';
import { persist } from 'zustand/middleware';

interface StoreState {
  // 本地存储数据
  personList: any[];
  abnormityList: any[];
  setPersonList: (personList: any[]) => void;
  setAbnormityList: (abnormityList: any[]) => void;
  // 通过状态判断刷新列表
  refreshList1: boolean; // 列表1是否需要刷新
  refreshList2: boolean; // 列表2是否需要刷新
  setRefreshPersonList: (refresh: boolean) => void;
  setRefreshAbnormityList: (refresh: boolean) => void;

  isRefreshList: boolean; // 是否需要刷新列表
  setIsRefreshList: (refresh: boolean) => void;
}

const useStore = create(
  persist<StoreState>(
    (set,get) => ({
      personList: [],
      abnormityList: [],
      setPersonList: (personList: any[]) => set({ personList }),
      setAbnormityList: (abnormityList: any[]) => set({ abnormityList }),

      refreshList1: false,
      refreshList2: false,
      setRefreshPersonList: (refresh) => set({ refreshList1: refresh }),
      setRefreshAbnormityList: (refresh) => set({ refreshList2: refresh }),

      isRefreshList: false,
      setIsRefreshList: (isRefreshList: boolean) => set({ isRefreshList })
    }),
    {
      name: 'personList-storage', // 存储的 key
      // getStorage: () => localStorage , // 默认是 localStorage
    }
  )
)
export default useStore;
