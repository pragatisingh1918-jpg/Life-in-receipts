import { useState, useEffect } from 'react';
import { LIFE_RECEIPTS } from '../data/receiptsData';

/**
 * Custom hook to manage receipts state with localStorage persistence
 * @returns {{ receipts: Array, addReceipts: Function, resetReceipts: Function }}
 */
export function useReceipts() {
  const [receipts, setReceipts] = useState(() => {
    try {
      const saved = localStorage.getItem('life_receipts_data');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // Fallback to default
    }
    return LIFE_RECEIPTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('life_receipts_data', JSON.stringify(receipts));
    } catch (e) {
      // Storage error fallback
    }
  }, [receipts]);

  const addReceipts = (newItems) => {
    setReceipts(prev => [...newItems, ...prev]);
  };

  const resetReceipts = () => {
    setReceipts(LIFE_RECEIPTS);
    localStorage.removeItem('life_receipts_data');
  };

  return { receipts, addReceipts, resetReceipts };
}
