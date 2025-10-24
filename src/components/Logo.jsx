import React from 'react';
import { useNavigate } from 'react-router-dom';
import LOGO from '@assets/images/logo.svg';

const Logo = ({ width = '15.78vw', height = '4.33vw' }) => {
  const navigate = useNavigate();

  return (
    <img
      src={LOGO}
      alt="Logo"
      style={{ width, height, cursor: 'pointer' }}
      onClick={() => navigate('/')}
      draggable="false"
    />
  );
};

export default Logo;
