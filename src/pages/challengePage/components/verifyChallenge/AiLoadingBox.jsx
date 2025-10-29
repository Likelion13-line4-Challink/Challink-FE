import React from 'react';
import s from '../style/AiLoadingBox.module.scss';
import Bubble from './Bubble';
import CHAR from '@assets/images/character.png';

const AILoadingBox = () => {
  return (
    <div className={s.aiLodingContainer}>
      <Bubble
        width="133px"
        height="52px"
        text={`AI가 사진을 분석하고\n 있어요...`}
        fontSize="12px"
      />
      <img src={CHAR} alt="캐릭터" width="63.44px" />
    </div>
  );
};

export default AILoadingBox;
