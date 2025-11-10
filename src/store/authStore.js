import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null, // 1. 리프레시 토큰 상태 추가
      user: null,
      isLoggedIn: false,

      // 2. 로그인 액션: access/refresh 토큰과 유저 정보 저장
      login: (tokens, userData) => {
        set({
          accessToken: tokens.access,
          refreshToken: tokens.refresh, // 리프레시 토큰 저장
          user: userData,
          isLoggedIn: true,
        });
      },

      // 3. 로그아웃 액션: 모든 인증 정보 초기화
      logout: () => {
        set({
          accessToken: null,
          refreshToken: null, // 리프레시 토큰 초기화
          user: null,
          isLoggedIn: false,
        });
      },

      // 사용자 정보 업데이트 (기존과 동일)
      setUser: (newUserData) => {
        set((state) => ({
          user: { ...state.user, ...newUserData },
        }));
      },

      // 4. (중요) 인터셉터용 토큰 갱신 액션
      // 새 토큰을 받아 스토어 상태를 업데이트합니다.
      setRefreshedTokens: (newTokens) => {
        set((state) => ({
          accessToken: newTokens.access,
          // 새 리프레시 토큰이 발급되었으면 갱신, 아니면 기존 값 유지
          refreshToken: newTokens.refresh || state.refreshToken,
        }));
      },
    }),
    {
      name: 'auth-storage',

      // 5. localStorage에 저장할 상태 (refreshToken 추가)
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken, // 리프레시 토큰 영속화
        userId: state.user?.id || null,
        isLoggedIn: state.isLoggedIn,
      }),
    },
  ),
);

export default useAuthStore;
