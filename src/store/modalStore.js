import { create } from 'zustand';

const useModalStore = create((set) => ({
  // modalData가 null이 아니면 모달을 띄웁니다.
  // 예: { modalType: 'ChallengeModal', modalProps: { challengeData: {...} } }
  modalData: null,

  // 모달 열기
  openModal: (modalType, modalProps = {}) => set({ modalData: { modalType, modalProps } }),

  // 모달 닫기
  closeModal: () => set({ modalData: null }),
}));

export default useModalStore;
