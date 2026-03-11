import { useSelector } from 'react-redux';
import type { RootState } from '@/store/rootReducer';
import { EmptyState } from '@/components/common/EmptyState';
import { useTranslations } from 'next-intl';
import { HistoryCard } from './HistoryCard';

export function HistoryList() {
  const t = useTranslations('history');
  const items = useSelector((state: RootState) => state.history.items);

  if (items.length === 0) {
    return <EmptyState title={t('empty')} />;
  }

  return (
    <div className="history-list">
      {items.map((item) => (
        <HistoryCard key={item.id} record={item} />
      ))}
    </div>
  );
}
