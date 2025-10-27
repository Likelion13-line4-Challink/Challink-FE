import React from 'react';
import s from './style/IconButton.module.scss';

const IconButton = ({ src, alt, width, onClick }) => {
  return (
    <button type="button" onClick={onClick} className={s.iconButtonContainer}>
      <img src={src} alt={alt} width={width} />
    </button>
  );
};

export default IconButton;
