
import axios, { AxiosInstance } from 'axios';

// 定义接口（根据实际情况定义）
// interface DataResponse {
//   message: string;
// }

const apiClient: AxiosInstance = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://36.133.62.220:30080',
  baseURL: '/api',
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
    withCredentials: true, // 允许跨域请求时携带cookie
  },
});

// 请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
