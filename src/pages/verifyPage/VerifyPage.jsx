import { useState } from 'react';
import ChallengeBody from '../challengeLayout/ChallengeBody';
import s from './VerifyPage.module.scss';
import EDIT from '@assets/images/icons/edit_icon.svg';
import GradientBox from '../../components/GradientBox';
import UploadPhoto from './components/UploadPhoto';
import IconButton from '../../components/IconButton';
import { useLocation, useParams } from 'react-router-dom';
import { editVerifyRule } from '../../apis/challenge/verify';
import useAuthStore from '../../store/authStore';

const VerifyPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const myUserId = useAuthStore((state) => state.userId);

  const {
    ai_condition = '기본 조건 텍스트',
    start_date,
    end_date,
    owner_id,
  } = location.state || {};

  const [isEditing, setIsEditing] = useState(false);
  const [conditionText, setConditionText] = useState(ai_condition);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setConditionText(e.target.value);
  };

  const handleEditIcon = async () => {
    if (isEditing) {
      try {
        setLoading(true);
        await editVerifyRule(id, { ai_condition_text: conditionText });
        alert('인증 조건이 수정되었습니다!');
      } catch (err) {
        console.error('인증 조건 수정 실패:', err);
        alert('수정 중 오류가 발생했습니다. 다시 시도해주세요.');
      } finally {
        setLoading(false);
      }
    }
    setIsEditing((prev) => !prev);
  };

  return (
    <ChallengeBody>
      <div className={s.verifyChallenge}>
        <GradientBox
          width="239px"
          height="60px"
          text={`꾸준함이 곧 실력!\n오늘도 도전 성공을 응원해요 ✨`}
          borderRadius="8px"
        />

        <p className={s.challengePeriod}>
          {start_date} ~ {end_date}
        </p>

        <UploadPhoto challengeId={id} />

        <div className={s.verifyCondition}>
          {isEditing ? (
            <input
              type="text"
              value={conditionText}
              onChange={handleChange}
              className={s.conditionInput}
              autoFocus
              disabled={loading}
            />
          ) : (
            <p>{conditionText}</p>
          )}

          {owner_id === myUserId && (
            <IconButton
              src={EDIT}
              alt={isEditing ? '저장' : '편집'}
              width="12px"
              onClick={handleEditIcon}
            />
          )}
        </div>
      </div>
    </ChallengeBody>
  );
};

export default VerifyPage;
