import { useState, useEffect, useCallback } from 'react';
import { getUserCreateStatus } from '@/lib/api/card.api';

export const useCreateStatus = () => {
  const [createStatus, setCreateStatus] = useState({
    createCount: 0,
    maxCount: 3,
    remainingCount: 0,
    canCreate: false,
    currentMonth: '',
    status: 'loading'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCreateStatus = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await getUserCreateStatus();
      setCreateStatus(response.data);
      
    } catch (err) {
      setError(err.message);
      console.error('생성 상태 조회 실패:', err);
      
      // 에러 시 기본값 설정
      setCreateStatus(prev => ({
        ...prev,
        status: 'error'
      }));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCreateStatus();
  }, [fetchCreateStatus]);

  const refreshCreateStatus = () => {
    fetchCreateStatus();
  };

  // 생성 후 상태 업데이트 (optimistic update)
  const decrementCreateCount = () => {
    setCreateStatus(prev => ({
      ...prev,
      createCount: Math.max(0, prev.createCount - 1),
      remainingCount: Math.max(0, prev.remainingCount - 1),
      canCreate: prev.createCount > 1,
      status: prev.createCount > 1 ? 'available' : 'exhausted'
    }));
  };

  return {
    createStatus,
    loading,
    error,
    refreshCreateStatus,
    decrementCreateCount
  };
};