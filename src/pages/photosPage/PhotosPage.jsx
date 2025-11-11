import { useState, useEffect } from 'react';
import s from './PhotosPage.module.scss';
import ChallengeBody from '../challengeLayout/ChallengeBody';
import PhotosChallenge from './components/PhotosChallenge';
import PhotoDetail from './components/PhotoDetail';
import useBodyScrollLock from '../../hooks/useBodyScrollLock';
import CategoryFilter from '../../components/CategoryFilter';
import { useParams } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import { getAllPhotosApi } from '../../apis/challenge/albums';

const pageCategories = ['MY', '전체', '김동국', '김숙명', '박한성', '김국민'];

const PhotosPage = () => {
  const { id: challengeId } = useParams();
  const { userName: currentUserName } = useAuthStore();

  const [photos, setPhotos] = useState([]); // 전체 사진
  const [isLoading, setIsLoading] = useState(false);

  const [selectedPhoto, setSelectedPhoto] = useState(null); // 선택된 사진
  const [selectedCategory, setSelectedCategory] = useState('MY');

  useBodyScrollLock(selectedPhoto);

  // 전체 사진 데이터 로딩
  useEffect(() => {
    if (!challengeId) return;

    // API 호출 함수 정의
    const fetchPhotos = async () => {
      setIsLoading(true);

      let nameParam = ''; // 이름 파라미터

      if (selectedCategory === 'MY') {
        nameParam = currentUserName || '';
        if (!nameParam) {
          console.warn('로그인된 사용자 이름이 없습니다.');
        }
      } else if (selectedCategory !== '전체') {
        nameParam = selectedCategory;
      }

      try {
        const data = await getAllPhotosApi(challengeId, nameParam);
        setPhotos(data);
      } catch (err) {
        console.error('사진 목록 조회 오류:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotos();
  }, [challengeId, selectedCategory, currentUserName]);

  // 클릭된 사진 정보를 받아 state에 저장
  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
  };

  // 사진 상세 닫기
  const handleCloseOverlay = () => {
    setSelectedPhoto(null);
  };

  return (
    <>
      <div className={s.PhotosPageContainer}>
        <CategoryFilter
          categories={pageCategories}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />
        <ChallengeBody>
          {isLoading && <p>사진을 불러오는 중...</p>}
          {!isLoading && <PhotosChallenge photoData={photos} onPhotoClick={handlePhotoClick} />}
        </ChallengeBody>
      </div>
      {selectedPhoto && <PhotoDetail photo={selectedPhoto} onClose={handleCloseOverlay} />}
    </>
  );
};

export default PhotosPage;
