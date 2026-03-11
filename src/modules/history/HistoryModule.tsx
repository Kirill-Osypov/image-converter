'use client';

import { Container } from '@/components/common/Container';
import { HistoryList } from '@/components/history/HistoryList';
import { StorageUsage } from '@/components/history/StorageUsage';
import { ClearAllButton } from '@/components/history/ClearAllButton';
import { useTranslations } from 'next-intl';

export function HistoryModule() {
  const t = useTranslations('history');

  return (
    <Container>
      <section className="history-layout">
        <header className="history-header">
          <h1 className="history-title">{t('heading')}</h1>
          <div className="history-header-actions">
            <StorageUsage />
            <ClearAllButton />
          </div>
        </header>
        <HistoryList />
      </section>
    </Container>
  );
}
