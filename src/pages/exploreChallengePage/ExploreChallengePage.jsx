import React, { useState, useEffect } from 'react';
import { challengeListApi, challengeDetailApi } from '@apis/auth/challengeApi';
import s from '././ExploreChallengePage.module.scss';
import Header from './components/Header.jsx';
import CategoryFilter from '../../components/CategoryFilter.jsx';
import AllChallenge from './components/AllChallengeBig.jsx';
import ChallengeModal from '@components/challengeModal/ChallengeModal.jsx';
import useNavigation from '../../hooks/useNavigation.js';

const pageCategories = ['전체', '운동', '삭습관', '생활', '기타'];

const ExploreChallengePage = () => {
  const { goTo } = useNavigation();

  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedChallengeId, setSelectedChallengeId] = useState(null);
  const [listData, setListData] = useState({ items: [] });
  const [detailData, setDetailData] = useState(null);

  // 목록 API 호출
  useEffect(() => {
    (async () => {
      try {
        const result = await challengeListApi();
        setListData(result);
      } catch (err) {
        console.error('챌린지 목록 로딩 실패:', err);
      }
    })();
  }, []);

  // ID 선택 시 API 호출 및 조건부 처리
  useEffect(() => {
    if (!selectedChallengeId) {
      setDetailData(null);
      return;
    }

    (async () => {
      try {
        const data = await challengeDetailApi(selectedChallengeId);

        // 참여 여부에 따른 분기 처리
        if (data && data.my_membership.is_joined) {
          // 참여 중: OngoingPage로 이동
          goTo(`/challenge/${selectedChallengeId}`);
        } else {
          // 팝업 렌더링을 위해 상세 데이터 state에 저장
          setDetailData(data);
        }
      } catch (err) {
        console.error('챌린지 상세 조회 실패:', err);
        // 에러 발생 시 모달 닫기
        setSelectedChallengeId(null);
      }
    })();
  }, [selectedChallengeId, goTo]);

  // 선택한 카테고리에 맞게 필터링
  const filteredItems =
    selectedCategory === '전체'
      ? listData.items
      : listData.items.filter((c) => c.category.name === selectedCategory);

  // 카드 클릭 시 ID 저장
  const handleCardClick = (challenge) => {
    setSelectedChallengeId(challenge.id);
  };
  const handleCloseModal = () => setSelectedChallengeId(null);

  return (
    <div className={s.exploreChallengePageContainer} style={{ marginBottom: '105px' }}>
      <Header />
      <CategoryFilter
        categories={pageCategories}
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />
      <AllChallenge challenges={filteredItems} onCardClick={handleCardClick} />{' '}
      {/* 팝업 렌더링 조건: detailData가 있고 is_joined가 false (미참여) */}
      {detailData && !detailData.my_membership.is_joined && (
        <ChallengeModal challengeData={detailData} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default ExploreChallengePage;
