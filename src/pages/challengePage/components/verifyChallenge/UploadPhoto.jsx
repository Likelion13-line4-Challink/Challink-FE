import React from 'react';
import s from '../style/UploadPhoto.module.scss';
import GradientButton from '../../../../components/GradientButton';
import CHAR from '@assets/images/character.png';

const UploadPhoto = () => {
  return (
    <div className={s.uploadPhotoContainer}>
      <div className={s.photo}>
        {/* 사진 없는 경우 */}
        <div className={s.noUpload}>
          <div className={s.bubble}>
            <p>혹시… 오늘 인증 깜빡하신 건 아니죠?</p>
          </div>
          <img src={CHAR} alt="캐릭터" width="83px" />
        </div>
      </div>

      {/* 사진올리기 버튼 */}
      <GradientButton width="255px" height="48px" text="사진올리기" />
    </div>
  );
};

export default UploadPhoto;
