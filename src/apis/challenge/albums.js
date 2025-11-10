import { defaultInstance } from '../utils/instance';

// 챌린지 기록 사진 목록(GET)
export const getAllPhotosApi = async (challenge_id, name) => {
  const config = {
    params: {},
  };

  if (name) {
    config.params.name = name;
  }

  const res = await defaultInstance.get(`/challenges/${challenge_id}/albums/`, config);
  return res.data;
};
