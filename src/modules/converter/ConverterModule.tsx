'use client';

import { Container } from '@/components/common/Container';
import { UploadZone } from '@/components/converter/UploadZone';
import { UploadPreviewList } from '@/components/converter/UploadPreviewList';
import { FormatSelector } from '@/components/converter/FormatSelector';
import { ConvertButton } from '@/components/converter/ConvertButton';
import { ResultCard } from '@/components/converter/ResultCard';
import { EmptyState } from '@/components/common/EmptyState';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/rootReducer';
import { useTranslations } from 'next-intl';

export function ConverterModule() {
  const t = useTranslations('converter');
  const results = useSelector((state: RootState) => state.converter.results);

  return (
    <Container>
      <section className="converter-layout">
        <header className="converter-header">
          <h1 className="converter-title">{t('heading')}</h1>
        </header>
        <div className="converter-main">
          <UploadZone />
          <div className="converter-controls">
            <FormatSelector />
            <ConvertButton />
          </div>
        </div>

        <UploadPreviewList />

        <section className="converter-results">
          {results.length === 0 ? (
            <EmptyState title={t('noResults')} />
          ) : (
            <div className="converter-results-grid">
              {results.map((record) => (
                <ResultCard key={record.id} record={record} />
              ))}
            </div>
          )}
        </section>
      </section>
    </Container>
  );
}
