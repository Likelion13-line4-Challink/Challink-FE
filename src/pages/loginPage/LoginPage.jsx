import React, { useState } from 'react';
import Header from './components/Header';
import AuthBox from '@components/authBox/AuthBox';
import Footer from './components/Footer';
import { CheckIcon, CheckFillIcon } from './components/icon/index';
import s from './components/styles/LoginPage.module.scss';
import AuthButton from '../../components/AuthButton';
import useFormValidation from '../../hooks/useFormValidation';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [idSave, setIdSave] = useState(false);
  const isValid = useFormValidation({ email, pw });

  const handleButtonClick = () => {
    //연동
  };
  return (
    <div>
      <Header />
      <div className={s.loginFormContainer}>
        <AuthBox
          label="이메일"
          type="email"
          placeholder="이메일을 입력해 주세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <AuthBox
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해 주세요"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />
        <div className={s.idSaveContainer}>
          <button type="button" onClick={() => setIdSave(!idSave)} className={s.idSaveBtn}>
            {idSave ? <CheckFillIcon /> : <CheckIcon />} 아이디 저장
          </button>
        </div>
      </div>

      <div className={s.loginBtnContainer}>
        <AuthButton text="로그인" isActive={isValid} onClick={handleButtonClick} />
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
