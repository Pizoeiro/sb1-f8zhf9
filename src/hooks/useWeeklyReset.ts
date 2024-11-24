import { useState, useEffect } from 'react';
import { useRankingStore } from '../store/rankingStore';

export function useWeeklyReset() {
  const resetWeeklyRankings = useRankingStore((state) => state.resetWeeklyRankings);

  const getNextSundayMidnight = () => {
    const now = new Date();
    const nextSunday = new Date();
    nextSunday.setDate(now.getDate() + (7 - now.getDay()));
    nextSunday.setHours(0, 0, 0, 0);
    return nextSunday;
  };

  const [nextReset, setNextReset] = useState(getNextSundayMidnight());

  useEffect(() => {
    const checkReset = () => {
      const now = new Date();
      if (now >= nextReset) {
        resetWeeklyRankings();
        setNextReset(getNextSundayMidnight());
      }
    };

    const interval = setInterval(checkReset, 1000 * 60); // Check every minute
    return () => clearInterval(interval);
  }, [nextReset, resetWeeklyRankings]);

  return nextReset;
}