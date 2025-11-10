import axios from 'axios';
import useAuthStore from '../../store/authStore'; // 경로는 실제 위치에 맞게 수정

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// ===== 공통 요청 인터셉터 (기존과 동일)
const onRequestFulfilled = (config) => {
  const publicUrls = ['/auth/login/', '/auth/signup/', '/auth/refresh/'];
  const isPublicRequest = publicUrls.some((url) => config.url.includes(url));

  if (!isPublicRequest) {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }
  return config;
};

const onRequestRejected = (error) => Promise.reject(error);

// ===== 응답 인터셉터
const onResponseRejected = async (error) => {
  const { response, config } = error;
  const { refreshToken, setRefreshedTokens, logout } = useAuthStore.getState();

  if (response?.status === 401 && !config._retry) {
    config._retry = true;

    try {
      if (!refreshToken) {
        throw new Error('리프레시 토큰이 스토어에 없습니다.');
      }

      // 리프레시 요청
      const refreshResponse = await axios.post(`${BASE_URL}/auth/refresh/`, {
        refresh: refreshToken,
      });

      const newAccessToken = refreshResponse.data.access;
      // 새로 발급된 리프레시 토큰 (Rotation)
      const newRefreshToken = refreshResponse.data.refresh;

      if (!newAccessToken) {
        throw new Error('새 액세스 토큰 발급 실패');
      }

      // 3. 스토어에 새 토큰들(access, refresh)을 저장
      // newRefreshToken이 undefined나 null이어도 setRefreshedTokens가 처리
      setRefreshedTokens({
        access: newAccessToken,
        refresh: newRefreshToken,
      });

      // 4. 재시도하는 요청의 헤더를 새 액세스 토큰으로 변경
      config.headers.Authorization = `Bearer ${newAccessToken}`;

      return axios(config); // 원래 요청 재시도
    } catch (refreshErr) {
      console.error('토큰 갱신 실패 → 로그아웃 처리:', refreshErr.message);
      // 5. 갱신 실패 시 스토어의 logout 액션 호출
      logout();
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
  }

  return Promise.reject(error);
};

// ===== 인스턴스 생성
export const defaultInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
});

defaultInstance.interceptors.request.use(onRequestFulfilled, onRequestRejected);
defaultInstance.interceptors.response.use((r) => r, onResponseRejected);

// ===== multipart 인스턴스
export const multiInstance = axios.create({ baseURL: BASE_URL });
multiInstance.interceptors.request.use(onRequestFulfilled, onRequestRejected);
multiInstance.interceptors.response.use((r) => r, onResponseRejected);
