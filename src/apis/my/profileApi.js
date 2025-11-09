import { defaultInstance } from '../utils/instance';

// 마이페이지 정보 조회(GET)
export const userInfoApi = async () => {
  const res = await defaultInstance.get(`/users/me/`);
  return res.data;
};

// 완료한 챌린지 목록(GET)
export const getCompletedChallengesApi = async (params) => {
  const res = await defaultInstance.get(`/challenges/my/completed/`, { params });
  return res.data;
};
