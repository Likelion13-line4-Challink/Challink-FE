import React from 'react';
import { Outlet } from 'react-router-dom';
import s from './ChallengePage.module.scss';
import ChallengeTitle from './components/ChallengeTitle.jsx';
import OngoingChallenge from './components/ongoingChallenge/OngoingChallenge.jsx';

const ChallengePage = ({ height = '672px' }) => {
  return (
    <div className={s.challengePageContainer}>
      <ChallengeTitle
        title={`📚 매일매일 독서 챌린지`}
        subTitle={`50,000p 걸고 1주 동안 매일 인증하기!`}
      />

      <div className={s.challengeBody} style={{ height }}>
        <OngoingChallenge />
      </div>
    </div>
  );
};

export default ChallengePage;
