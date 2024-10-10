import apiClient from '@/utils/request';
// 获取人员列表
export const getPersonEntryList = (params: { pageNo: number; pageSize: number; }) =>{
    
    return apiClient.get('/converter/home/getPersonEntrySummaries', {
        params: {
            ...params,
            pageNo: params.pageNo,
            pageSize: params.pageSize,
            
        }
    })
}
// 获取异常人员列表
export const getPersonAbnormalEntryList = (params: { pageNo: number; pageSize: number; }) =>{
    
    return apiClient.get('/converter/home/getPersonAbnormalEntrySummaries', {
        params: {
            ...params,
            pageNo: params.pageNo,
            pageSize: params.pageSize,
            
        }
    })
}
export const getCurrentVideoUrl = (params: { deviceId: string; entryTime: string; }) =>{
    
    return apiClient.post('/converter/stream/getWebSdkPlayBack', {

            deviceId: params.deviceId,
            entryTime: params.entryTime
    })
}
export const confirmEntryStatus = (params: { id: string; entryStatus: string; }) =>{
    
    return apiClient.post('/converter/home/confirmEntryStatus', {
        id: params.id,
        entryStatus:params.entryStatus
    })
}