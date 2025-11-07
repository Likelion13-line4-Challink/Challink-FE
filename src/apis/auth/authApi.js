import { defaultInstance } from '../utils/instance';

// const signupUserApi = async (signupData) => {
//   const response = await defaultInstance.post('/auth/signup/', signupData);

//   if (response.status === 201) {
//     console.log('회원가입 성공:', response.data);
//     return response.data;
//   }

//   console.warn('요청은 성공했으나 예기치 않은 응답:', response);
//   throw new Error('서버로부터 예기치 않은 응답을 받았습니다.');
// };

export const signupUserApi = async (data) => {
  const res = await defaultInstance.post('/auth/signup/', data);
  return res.data;
};
