import React, { useState, useEffect } from 'react';
import { challengeDetailApi } from '@apis/auth/challengeApi';

import s from './ChallengeModal.module.scss';
import closeIcon from '../../assets/images/icon_close.svg';
import checkFillIcon from '../../assets/images/check_fill_icon.svg';
import checkIcon from '../../assets/images/check_icon.svg';
import GradientButton from '../../components/GradientButton';

const ChallengeModal = ({ onClose, challengeId }) => {
  // API 데이터 관리
  const [challenge, setChallenge] = useState(null);
  // const [loading, setLoading] = useState(false);

  const [agreed, setAgreed] = useState(false);

  // 모달 상태 관리
  useEffect(() => {
    // if (!challengeId) return; // 필요한 지 모르겠음

    const fetchDetail = async () => {
      try {
        // setLoading(true);
        const data = await challengeDetailApi(challengeId);
        setChallenge(data);
      } catch (err) {
        console.log(err);
      } // finally {
      //   setLoading(false); }
    };

    fetchDetail();
  }, [challengeId]); // challengeId가 바뀔 때마다 실행

  const handleAgreeClick = () => {
    setAgreed((prev) => !prev);
  };

  const handleSubmit = () => {
    if (!agreed) return;
  };

  return (
    <div className={s.modalOverlay}>
      <section className={s.challengeModalContainer}>
        {/* 닫기 버튼 */}
        <button className={s.closeButton} onClick={onClose}>
          <img src={closeIcon} alt="닫기 아이콘" />
        </button>

        {/* 제목 */}
        <h2 className={s.challengeTitle}>{challenge.title}</h2>

        {/* 유저 정보 */}
        <div className={s.userInfo}>
          <p className={s.userName}>{challenge.owner_name}님의 챌린지</p>
        </div>

        {/* 커버 */}
        <img src={challenge.over_image} className={s.coverImage} alt="" />

        {/* 상세 카드 */}
        <div className={s.challengeInfoCard}>
          <h3 className={s.challengeInfo}>
            {challenge.entry_fee.toLochallengealeString()}p 걸고 {challenge.duration_weeks}주 동안{' '}
            {challenge.freq_type} 인증하기!
          </h3>

          <div className={s.meta}>
            <p className={s.description}>{challenge.subtitle}</p>
            <p className={s.aiCondition}>{challenge.ai_condition}</p>
          </div>

          <p className={s.duration}>
            {challenge.start_date.replaceAll('-', '.')} ~ {challenge.end_date.replaceAll('-', '.')}
          </p>
        </div>

        {/* 동의하기 버튼 */}
        <div className={s.agreeContainer}>
          <button
            type="button"
            className={s.agreeButton}
            onClick={handleAgreeClick}
            aria-pressed={agreed}
          >
            <img
              src={agreed ? checkFillIcon : checkIcon}
              alt={agreed ? '동의됨' : '동의 필요'}
              className={s.agreeIcon}
            />
            위 내용에 동의합니다.
          </button>
        </div>

        {/* 도전하기: 동의해야 활성화 */}
        <GradientButton
          width="255px"
          height="48px"
          text="도전하기"
          fontSize="14px"
          isFilled={true}
          onClick={handleSubmit}
          disabled={!agreed}
        />
      </section>
    </div>
  );
};

export default ChallengeModal;
