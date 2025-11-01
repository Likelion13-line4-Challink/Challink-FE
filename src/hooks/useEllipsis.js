import { useState, useEffect } from 'react';

// . .. ... 를 반복하는 애니메이션 훅

const useEllipsis = (delay = 500) => {
  const [ellipsis, setEllipsis] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      setEllipsis((prev) => {
        if (prev === '...') {
          return '';
        }
        return prev + '.';
      });
    }, delay);

    return () => {
      clearInterval(intervalId);
    };
  }, [delay]);

  return ellipsis;
};

export default useEllipsis;
