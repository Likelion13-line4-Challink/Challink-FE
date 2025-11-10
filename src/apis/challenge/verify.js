import { multiInstance } from '../utils/instance';

// 챌린지 사진 인증(POST)
export const verifyChallengePhotoApi = async (challenge_id, imageFile) => {
  // FormData 생성 및 파일 추가
  const formData = new FormData();
  formData.append('image', imageFile);

  const res = await multiInstance.post(`/aiauth/${challenge_id}/`, formData);
  return res.data;
};
