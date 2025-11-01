import React from 'react';
import s from './style/GradientBox.module.scss';

const GradientBox = ({ width, height, text, borderRadius, square = false }) => {
  const boxClassName = `${s.gradientBox} ${square ? s.isSquare : ''}`;

  return (
    <div className={boxClassName.trim()} style={{ width, height, borderRadius }}>
      <div className={s.gradientText}>{text}</div>
    </div>
  );
};

export default GradientBox;
