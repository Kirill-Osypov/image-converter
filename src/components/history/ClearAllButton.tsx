'use client';

import { useDispatch, useSelector } from 'react-redux';
import { useTranslations } from 'next-intl';
import type { RootState } from '@/store/rootReducer';
import { clearHistoryRequested } from '@/store/slices/historySlice';
import { Button } from '@/components/common/Button';

export function ClearAllButton() {
  const t = useTranslations('history');
  const dispatch = useDispatch();
  const hasItems = useSelector((state: RootState) => state.history.items.length > 0);

  const onClick = () => {
    if (!hasItems) return;
    dispatch(clearHistoryRequested());
  };

  return (
    <Button variant="ghost" disabled={!hasItems} onClick={onClick}>
      {t('clearAll')}
    </Button>
  );
}
