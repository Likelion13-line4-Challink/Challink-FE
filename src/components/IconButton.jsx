import React from 'react';

const IconButton = ({ src, alt, width, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: 'inline-flex',
        background: 'none',
        border: 'none',
        padding: 0,
        margin: 0,
        cursor: 'pointer',
      }}
    >
      <img src={src} alt={alt} width={width} />
    </button>
  );
};

export default IconButton;
