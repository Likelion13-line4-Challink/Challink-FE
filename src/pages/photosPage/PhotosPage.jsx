import React from 'react';
import ChallengeBody from '../challengeLayout/ChallengeBody';
import PhotosChallenge from './components/PhotosChallenge';
import data from './datas/photosDummy.json';

const PhotosPage = () => {
  return (
    <>
      <div style={{ width: '100%', height: '32px', backgroundColor: 'red' }}>필터링</div>
      <ChallengeBody height="624px">
        <PhotosChallenge photoData={data} />
      </ChallengeBody>
    </>
  );
};

export default PhotosPage;
