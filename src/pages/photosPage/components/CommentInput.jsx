import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import s from './style/Comment.module.scss';
import SEND_ICON from '@assets/images/icons/send_icon.svg';
import SEND_FULL_ICON from '@assets/images/icons/send_full_icon.svg';
import IconButton from '../../../components/IconButton';

const CommentInput = ({ styleProps, value, onChange, onSubmit }) => {
  const textareaRef = useRef(null);
  const [isSendHover, setIsSendHover] = useState(false);

  // 텍스트 변경 및 높이 자동 조절
  const handleTextChange = (e) => {
    onChange(e.target.value);

    // 높이 자동 조절
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  // 포커스 및 높이 초기화
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.style.height = 'auto';
    }
  }, []);

  return createPortal(
    <div style={styleProps} className={s.commentInputPopup}>
      <textarea
        ref={textareaRef}
        className={s.commentTextarea}
        placeholder="댓글을 남겨주세요"
        value={value}
        onChange={handleTextChange}
        rows={1}
      />
      <IconButton
        src={isSendHover ? SEND_FULL_ICON : SEND_ICON}
        alt="전송"
        width="19px"
        onClick={onSubmit}
        onMouseEnter={() => setIsSendHover(true)}
        onMouseLeave={() => setIsSendHover(false)}
      />
    </div>,
    document.body,
  );
};

export default CommentInput;
