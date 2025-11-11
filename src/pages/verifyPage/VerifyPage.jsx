import { useState } from 'react';
import ChallengeBody from '../challengeLayout/ChallengeBody';
import s from './VerifyPage.module.scss';
import EDIT from '@assets/images/icons/edit_icon.svg';
import GradientBox from '../../components/GradientBox';
import UploadPhoto from './components/UploadPhoto';
import IconButton from '../../components/IconButton';
import { useParams } from 'react-router-dom';

const VerifyPage = () => {
  const { id } = useParams();

  const [isEditing, setIsEditing] = useState(false);
  const [conditionText, setConditionText] = useState('책 페이지 번호 + 손가락 브이');

  // 수정 중이면 저장, 아니면 수정 시작
  const handleEditIcon = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setConditionText(e.target.value);
  };

  return (
    <ChallengeBody>
      <div className={s.verifyChallenge}>
        {/* 응원 메세지 */}
        <GradientBox
          width="239px"
          height="60px"
          text={`꾸준함이 곧 실력!\n오늘도 도전 성공을 응원해요 ✨`}
          borderRadius="8px"
        />

        {/* 챌린지 기간 */}
        <p className={s.challengePeriod}>2025.10.01 ~ 2025.10.08</p>

        {/* 사진 + 업로드 버튼 */}
        <UploadPhoto challengeId={id} />

        {/* 인증 조건 */}
        <div className={s.verifyCondition}>
          {isEditing ? (
            <input
              type="text"
              value={conditionText}
              onChange={handleChange}
              className={s.conditionInput}
              autoFocus
            />
          ) : (
            <p>{conditionText}</p>
          )}
          <IconButton src={EDIT} alt="편집" width="12px" onClick={handleEditIcon} />
        </div>
      </div>
    </ChallengeBody>
  );
};

export default VerifyPage;
