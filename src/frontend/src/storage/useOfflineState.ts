import { useState, useEffect, useCallback } from 'react';
import { getState, setState, addDraftAttempt, updateDraftAttempt, getDraftAttempt } from './localStore';
import { StorageState, DraftAttempt } from './types';

export function useOfflineState() {
  const [state, setStateInternal] = useState<StorageState>(getState());

  const refresh = useCallback(() => {
    setStateInternal(getState());
  }, []);

  useEffect(() => {
    const interval = setInterval(refresh, 1000);
    return () => clearInterval(interval);
  }, [refresh]);

  const updateState = useCallback((updates: Partial<StorageState>) => {
    setState(updates);
    refresh();
  }, [refresh]);

  const saveDraftAttempt = useCallback((attempt: DraftAttempt) => {
    addDraftAttempt(attempt);
    refresh();
  }, [refresh]);

  const updateAttempt = useCallback((attemptId: string, updates: Partial<DraftAttempt>) => {
    updateDraftAttempt(attemptId, updates);
    refresh();
  }, [refresh]);

  const getAttempt = useCallback((attemptId: string) => {
    return getDraftAttempt(attemptId);
  }, []);

  return {
    ...state,
    updateState,
    saveDraftAttempt,
    updateAttempt,
    getAttempt,
    refresh,
  };
}
