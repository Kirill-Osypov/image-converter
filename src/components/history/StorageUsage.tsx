import { useSelector } from 'react-redux';
import type { RootState } from '@/store/rootReducer';
import { useTranslations } from 'next-intl';

export function StorageUsage() {
  const t = useTranslations('history');
  const totalSizeBytes = useSelector((state: RootState) => state.history.totalSizeBytes);

  const mb = totalSizeBytes / (1024 * 1024);

  return (
    <div className="storage-usage">
      <span className="storage-label">{t('storageUsage')}</span>
      <span className="storage-value">{mb.toFixed(2)} MB</span>
    </div>
  );
}
