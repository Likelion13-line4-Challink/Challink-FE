import ChallengeBody from '../challengeLayout/ChallengeBody';
import s from './ResultPage.module.scss';
import data from './datas/resultDummy.json';
import { formatNumberWithCommas } from '../../utils/format';
import ResultItem from './components/ResultItem';
import GradientBox from '../../components/GradientBox';
import GradientButton from '../../components/GradientButton';

const ResultPage = () => {
  const { pot_total, rule_text, allocations, my } = data;

  return (
    <ChallengeBody>
      <div className={s.resultChallengeContainer}>
        {/* 총 참가비, 정산 방법 */}
        <div className={s.moneyInfo}>
          <GradientBox
            width="211px"
            height="36px"
            text={`총 참가비: ${formatNumberWithCommas(pot_total)}p`}
            borderRadius="20000px"
            fontSize="14px"
            icon={true}
          />
          <p>{rule_text}</p>
        </div>

        {/* 멤버별 성공횟수 및 포인트 */}
        <div className={s.memberItems}>
          {allocations.map((allocation) => (
            <ResultItem
              key={allocation.user_id}
              data={allocation}
              isMe={allocation.user_id === my.user_id}
            />
          ))}
        </div>

        {/* 보상받기 버튼 */}
        <GradientButton width="196px" text={`보상받기`} borderRadius="12px" />
      </div>
    </ChallengeBody>
  );
};

export default ResultPage;
