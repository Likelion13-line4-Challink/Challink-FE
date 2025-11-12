import { defaultInstance } from '../utils/instance';

// 챌린지 종료(POST)
export const challengeEndApi = async (challenge_id) => {
  const res = await defaultInstance.post(`/challenges/${challenge_id}/end/`);
  return res.data;
};
